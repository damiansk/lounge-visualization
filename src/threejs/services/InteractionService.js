import DragControls from 'three-dragcontrols';
import { ControlsService } from '../services/CameraControlsService';
import { RaycasterService } from '../services/RaycasterService';

const meshes = [
    
];
class InteractionService {

    static init(camera, renderer) {
        const dragControls = new DragControls(meshes, camera, renderer.domElement);

        dragControls.addEventListener('dragstart', () => ControlsService.disable());
        dragControls.addEventListener('dragend', () => ControlsService.enable());
    }

    static register(mesh) {
        // RaycasterService.register(mesh);
        meshes.push(mesh);
    }

    static onMouseDown(evt) {
        console.log('down');
        meshes.forEach(mesh => mesh.userData.instance.onMouseDown(evt));
    }

    static onMouseUp(evt) {
        meshes.forEach(mesh => mesh.userData.instance.onMouseUp(evt));
    }

    static onMouseMove(evt) {
        meshes.forEach(mesh => mesh.userData.instance.onMouseMove(evt));
    }
}

export { InteractionService };