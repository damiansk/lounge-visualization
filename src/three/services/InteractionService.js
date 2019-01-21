import { Box3 } from 'three';
import { DragControls } from '../libs/three-dragcontrols';
import { ControlsService } from './CameraControlsService';

class InteractionService {
  constructor(camera, renderer) {
    this.interactiveMeshes = [];
    this.staticMeshes = [];
    this.dragStartPosition = null;
    const dragControls = new DragControls(
      this.interactiveMeshes,
      camera,
      renderer.domElement
    );

    dragControls.addEventListener('dragstart', () => ControlsService.disable());
    dragControls.addEventListener('dragend', () => ControlsService.enable());
    dragControls.addEventListener('dragstart', this.dragStartHandler);
    dragControls.addEventListener('dragend', this.dragEndHandler);
    dragControls.addEventListener('drag', this.dragHandler);
  }

  register(mesh) {
    this.meshes.push(mesh);
  }

  registerInteractiveMesh = mesh => {
    this.interactiveMeshes.push(mesh);
  };

  registerStaticMesh = mesh => {
    this.staticMeshes.push(mesh);
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

  dragStartHandler = event => {
    const { object } = event;
    object.userData.interactionService = {
      material: object.material.clone(),
    };
    object.material.color.set(0x808080);
    object.material.transparent = true;
    object.material.opacity = 0.6;

    this.dragStartPosition = object.position.clone();
  };

  dragEndHandler = event => {
    const { object } = event;
    object.material = object.userData.interactionService.material;

    if (this.isCollideWithAnyMesh(object)) {
      const { x, y, z } = this.dragStartPosition;
      object.position.set(x, y, z);
      this.dragStartPosition = null;
    }
  };

  dragHandler = ({ object }) => {
    if (this.isCollideWithAnyMesh(object)) {
      object.material.color.set(0xff0000);
    } else {
      object.material.color.set(0x808080);
    }
  };
}

export { InteractionService };
