import * as THREE from 'three';
import DragControls from 'three-dragcontrols';
import { ControlsService } from '../services/CameraControlsService';

const meshes = [];
let dragStartPosition = null;

class InteractionService {

    static init(camera, renderer) {
        const dragControls = new DragControls(meshes, camera, renderer.domElement);

        dragControls.addEventListener('dragstart', () => ControlsService.disable());
        dragControls.addEventListener('dragend', () => ControlsService.enable());
        dragControls.addEventListener('dragstart', this.dragStartHandler);
        dragControls.addEventListener('dragend', this.dragEndHandler);
        dragControls.addEventListener('drag', this.dragHandler);
    }

    static register(mesh) {
        meshes.push(mesh);
    }

    static dragStartHandler({ object }) {
        object.userData.__interactionService = {
            material: object.material.clone(),
        }
        object.material.color.set(0x808080);
        object.material.transparent = true;
        object.material.opacity = 0.6;

        dragStartPosition = object.position.clone();
    }

    static dragEndHandler({ object }) {
        object.material = object.userData.__interactionService.material;

        const { x, y, z } = dragStartPosition;
        object.position.set(x, y, z);
        dragStartPosition = null;
    }

    static dragHandler({ object }) {
        const bbox = new THREE.Box3().setFromObject(object);
        
        object.material.color.set(0x808080);
        for(let mesh of meshes) {
            const otherBBox = new THREE.Box3().setFromObject(mesh);
            
            const isIntersected = bbox.intersectsBox(otherBBox);

            if(isIntersected && mesh !== object) {
                object.material.color.set(0xff0000);
                return;
            }
        }
    }
}

export { InteractionService };