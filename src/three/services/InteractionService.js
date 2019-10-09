import { Box3, Vector3, Raycaster } from 'three';
import { updateMeshOrGroup } from '../utils/model';
import { DragControls } from '../libs/three-dragcontrols';
import { CameraControlsService } from './CameraControlsService';

class InteractionService {
  constructor(camera, renderer, animationService) {
    this.interactiveMeshes = [];
    this.staticMeshes = [];
    this.dragStartPosition = null;
    this.prevHoverOnMesh = null;

    this.animationService = animationService;
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
    if (model.attributes.isInteractive) {
      this.interactiveMeshes.push(model.mesh);
    } else {
      this.staticMeshes.push(model.mesh);
    }

    this.modelsWeakMap.set(model.mesh, model);
    this.updateModelBoundingBox(model.mesh);

    // TODO Unsubscribe during removing model or destructing instance
    model
      .getAttribute$('isInteractive')
      .subscribe(isInteractive => this.update(model, isInteractive));
  }

  update(model, isInteractive) {
    const { mesh } = model;

    this.remove(model);

    if (isInteractive) {
      this.interactiveMeshes.push(mesh);
    } else {
      this.staticMeshes.push(mesh);
    }
  }

  remove(model) {
    const { mesh } = model;

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

    updateMeshOrGroup(object, mesh => {
      mesh.userData.interactionService = {
        material: mesh.material.clone(),
      };
      mesh.material.color.set(0x808080);
      mesh.material.transparent = true;
      mesh.material.opacity = 0.6;
    });

    this.dragStartPosition = object.position.clone();
  }

  dragHandler(event) {
    const { object } = event;
    if (
      this.isCollideWithAnyMesh(object)
      ||
      !this.isInInteractionsScope(object)
    ) {
      updateMeshOrGroup(object, mesh => {
        mesh.material.color.set(0xff0000);
      });
    } else {
      updateMeshOrGroup(object, mesh => {
        mesh.material.color.set(0x808080);
      });
    }
  }

  dragEndHandler(event) {
    const { object } = event;

    updateMeshOrGroup(object, mesh => {
      mesh.material = mesh.userData.interactionService.material;
    });

    // TODO Improvement - isCollideWithAnyMesh && isInInteractionsScope calculating object bounding Box
    if (
      this.isCollideWithAnyMesh(object)
      ||
      !this.isInInteractionsScope(object)
    ) {
      // TODO Need to set isInteractive to false or have possibility to break animation and interact again
      this.animationService.animate(object, this.dragStartPosition);
      this.dragStartPosition = null;
    } else {
      this.updateModelBoundingBox(object);
    }
  }

  hoverOnHandler(event) {
    const { object } = event;

    if (!!this.prevHoverOnMesh && this.prevHoverOnMesh !== object) {
      this.modelsWeakMap
        .get(this.prevHoverOnMesh)
        .setAttribute$('isHovered', false);
    }
    this.prevHoverOnMesh = object;

    this.modelsWeakMap.get(object).setAttribute$('isHovered', true);
  }

  hoverOffHandler(event) {
    const { object } = event;

    this.modelsWeakMap.get(object).setAttribute$('isHovered', false);

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

      const collisions = this.raycaster.intersectObject(
        this.interactionScope,
        true
      );

      return collisions.length === 0;
    });

    return !isAnyPointOutsideTheScope;
  }
}

export { InteractionService };
