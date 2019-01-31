import { Box3 } from 'three';
import { DragControls } from '../libs/three-dragcontrols';
import { CameraControlsService } from './CameraControlsService';

class InteractionService {
  constructor(camera, renderer) {
    this.interactiveMeshes = [];
    this.staticMeshes = [];
    this.dragStartPosition = null;

    this.dragControls = new DragControls(
      this.interactiveMeshes,
      camera,
      renderer.domElement
    );

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
    this.dragHandler = this.dragHandler.bind(this);

    this.dragControls.addEventListener('dragstart', CameraControlsService.disable);
    this.dragControls.addEventListener('dragend', CameraControlsService.enable);
    this.dragControls.addEventListener('dragstart', this.dragStartHandler);
    this.dragControls.addEventListener('dragend', this.dragEndHandler);
    this.dragControls.addEventListener('drag', this.dragHandler);
  }

  add({ isInteractive, mesh }) {
    if (isInteractive) {
      this.interactiveMeshes.push(mesh);
    } else {
      this.staticMeshes.push(mesh);
    }
  }

  remove({ mesh }) {
    const interactiveMeshIndex = this.interactiveMeshes.indexOf(mesh);
    if(interactiveMeshIndex >= 0) {
      this.interactiveMeshes.splice(interactiveMeshIndex, 1);
    }
    
    const staticMeshIndex = this.interactiveMeshes.indexOf(mesh);
    if(staticMeshIndex >= 0) {
      this.staticMeshes.splice(staticMeshIndex, 1);
    }
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
  };

  dragEndHandler(event) {
    const { object } = event;
    object.material = object.userData.interactionService.material;

    if (this.isCollideWithAnyMesh(object)) {
      const { x, y, z } = this.dragStartPosition;
      object.position.set(x, y, z);
      this.dragStartPosition = null;
    }
  };

  dragHandler({ object }) {
    if (this.isCollideWithAnyMesh(object)) {
      object.material.color.set(0xff0000);
    } else {
      object.material.color.set(0x808080);
    }
  };

  isCollideWithAnyMesh(object) {
    const boundingBox = new Box3().setFromObject(object);
    const meshes = this.interactiveMeshes.concat(this.staticMeshes);
    for (let i = meshes.length - 1; i >= 0; i--) {
      const tempBoundingBox = new Box3().setFromObject(meshes[i]);

      const isIntersected = boundingBox.intersectsBox(tempBoundingBox);

      if (isIntersected && meshes[i] !== object) {
        return true;
      }
    }

    return false;
  }
}

export { InteractionService };
