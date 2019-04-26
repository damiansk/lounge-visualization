import { Box3, Vector3, Raycaster } from 'three';
import { DragControls } from '../libs/three-dragcontrols';
import { CameraControlsService } from './CameraControlsService';

class InteractionService {
  constructor(camera, renderer) {
    this.interactiveMeshes = [];
    this.staticMeshes = [];
    this.dragStartPosition = null;
    this.prevHoverOnMesh = null;

    this.raycaster = new Raycaster();

    this.dragControls = new DragControls(
      this.interactiveMeshes,
      camera,
      renderer.domElement
    );

    this.modelsWeakMap = new WeakMap();
    this.modelsBoxWeakMap = new WeakMap();

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
    this.dragHandler = this.dragHandler.bind(this);
    this.hoverOnHandler = this.hoverOnHandler.bind(this);
    this.hoverOffHandler = this.hoverOffHandler.bind(this);
    this.updateModelBoundingBox = this.updateModelBoundingBox.bind(this);
    this.getModelBoundingBox = this.getModelBoundingBox.bind(this);

    this.dragControls.addEventListener(
      'dragstart',
      CameraControlsService.disable
    );
    this.dragControls.addEventListener('dragend', CameraControlsService.enable);
    this.dragControls.addEventListener('dragstart', this.dragStartHandler);
    this.dragControls.addEventListener('dragend', this.dragEndHandler);
    this.dragControls.addEventListener('drag', this.dragHandler);
    this.dragControls.addEventListener('hoveron', this.hoverOnHandler);
    this.dragControls.addEventListener('hoveroff', this.hoverOffHandler);
  }

  add(model) {
    if (model.isInteractive) {
      this.interactiveMeshes.push(model.mesh);
    } else {
      this.staticMeshes.push(model.mesh);
    }
    this.modelsWeakMap.set(model.mesh, model);
    this.updateModelBoundingBox(model.mesh);
  }

  remove({ mesh }) {
    const interactiveMeshIndex = this.interactiveMeshes.indexOf(mesh);
    if (interactiveMeshIndex >= 0) {
      this.interactiveMeshes.splice(interactiveMeshIndex, 1);
    }

    const staticMeshIndex = this.interactiveMeshes.indexOf(mesh);
    if (staticMeshIndex >= 0) {
      this.staticMeshes.splice(staticMeshIndex, 1);
    }
  }

  registerInterationScope(model) {
    this.interactionScope = model;
  }

  dragStartHandler(event) {
    const { object } = event;
    object.userData.interactionService = {
      material: object.material.clone(),
    };
    object.material.color.set(0x808080);
    object.material.transparent = true;
    object.material.opacity = 0.6;

    this.dragStartPosition = object.position.clone();
  }

  dragEndHandler(event) {
    const { object } = event;
    object.material = object.userData.interactionService.material;

    // TODO Improvement - isCollideWithAnyMesh && isInInteractionsScope calculating object bounding Box
    if (
      this.isCollideWithAnyMesh(object) ||
      !this.isInInteractionsScope(object)
    ) {
      const { x, y, z } = this.dragStartPosition;
      object.position.set(x, y, z);
      this.dragStartPosition = null;
    } else {
      this.updateModelBoundingBox(object);
    }
  }

  dragHandler({ object }) {
    if (
      this.isCollideWithAnyMesh(object) ||
      !this.isInInteractionsScope(object)
    ) {
      object.material.color.set(0xff0000);
    } else {
      object.material.color.set(0x808080);
    }
  }

  hoverOnHandler({ object: mesh }) {
    if (!!this.prevHoverOnMesh && this.prevHoverOnMesh !== mesh) {
      this.modelsWeakMap.get(this.prevHoverOnMesh).setHover(false);
    }
    this.prevHoverOnMesh = mesh;
    this.modelsWeakMap.get(mesh).setHover(true);
  }

  hoverOffHandler({ object: mesh }) {
    this.modelsWeakMap.get(mesh).setHover(false);
    this.prevHoverOnMesh = null;
  }

  updateModelBoundingBox(mesh) {
    const boundingBox = new Box3().setFromObject(mesh);
    this.modelsBoxWeakMap.set(mesh, boundingBox);

    return boundingBox;
  }

  getModelBoundingBox(mesh) {
    let boundingBox = this.modelsBoxWeakMap.get(mesh);

    if (!boundingBox) {
      boundingBox = this.updateModelBoundingBox(mesh);
    }

    return boundingBox;
  }

  isCollideWithAnyMesh(object) {
    const boundingBox = new Box3().setFromObject(object);
    const meshes = this.interactiveMeshes.concat(this.staticMeshes);
    for (let i = meshes.length - 1; i >= 0; i--) {
      const tempBoundingBox = this.getModelBoundingBox(meshes[i]);

      const isIntersected = boundingBox.intersectsBox(tempBoundingBox);

      if (isIntersected && meshes[i] !== object) {
        return true;
      }
    }

    return false;
  }

  isInInteractionsScope(object) {
    const boundingBox = new Box3().setFromObject(object);
    const direction = new Vector3(0, -1, 0);

    const y = 1;
    const xMin = boundingBox.min.x;
    const zMin = boundingBox.min.z;
    const xMax = boundingBox.max.x;
    const zMax = boundingBox.max.z;

    const points = [
      new Vector3(xMin, y, zMin),
      new Vector3(xMax, y, zMin),
      new Vector3(xMax, y, zMax),
      new Vector3(xMin, y, zMax),
    ];

    const isAnyPointOutsideTheScope = points.some(point => {
      this.raycaster.set(point, direction);

      const collisions = this.raycaster.intersectObjects(
        this.interactionScope.children
      );

      return collisions.length === 0;
    });

    return !isAnyPointOutsideTheScope;
  }
}

export { InteractionService };