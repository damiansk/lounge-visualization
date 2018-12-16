import * as THREE from 'three';
import { DragControls } from '../libs/three-dragcontrols';
import { ControlsService } from '../services/CameraControlsService';

const interactiveMeshes = [];
const staticMeshes = [];
let dragStartPosition = null;

function isCollideWithAnyMesh(object) {
  const boundingBox = new THREE.Box3().setFromObject(object);

  for (let mesh of interactiveMeshes) {
    const tempBoundingBox = new THREE.Box3().setFromObject(mesh);

    const isIntersected = boundingBox.intersectsBox(tempBoundingBox);

    if (isIntersected && mesh !== object) {
      return true;
    }
  }

  for (let mesh of staticMeshes) {
    const tempBoundingBox = new THREE.Box3().setFromObject(mesh);

    const isIntersected = boundingBox.intersectsBox(tempBoundingBox);

    if (isIntersected && mesh !== object) {
      return true;
    }
  }

  return false;
}

class InteractionService {
  static init(camera, renderer) {
    const dragControls = new DragControls(interactiveMeshes, camera, renderer.domElement);

    dragControls.addEventListener('dragstart', () => ControlsService.disable());
    dragControls.addEventListener('dragend', () => ControlsService.enable());
    dragControls.addEventListener('dragstart', this.dragStartHandler);
    dragControls.addEventListener('dragend', this.dragEndHandler);
    dragControls.addEventListener('drag', this.dragHandler);
  }

  static registerInteractiveMesh(mesh) {
    interactiveMeshes.push(mesh);
  }

  static registerStaticMesh(mesh) {
    staticMeshes.push(mesh);
  }

  static dragStartHandler({ object }) {
    object.userData.interactionService = {
      material: object.material.clone(),
    };
    object.material.color.set(0x808080);
    object.material.transparent = true;
    object.material.opacity = 0.6;

    dragStartPosition = object.position.clone();
  }

  static dragEndHandler({ object }) {
    object.material = object.userData.interactionService.material;

    if (isCollideWithAnyMesh(object)) {
      const { x, y, z } = dragStartPosition;
      object.position.set(x, y, z);
      dragStartPosition = null;
    }
  }

  static dragHandler({ object }) {
    if (isCollideWithAnyMesh(object)) {
      object.material.color.set(0xff0000);
    } else {
      object.material.color.set(0x808080);
    }
  }
}

export { InteractionService };
