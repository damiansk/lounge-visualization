import DragControls from 'three-dragcontrols';
import { ControlsService } from '../services/CameraControlsService';

const meshes = [];

class InteractionService {

    static init(camera, renderer) {
        const dragControls = new DragControls(meshes, camera, renderer.domElement);

        dragControls.addEventListener('dragstart', () => ControlsService.disable());
        dragControls.addEventListener('dragend', () => ControlsService.enable());
        dragControls.addEventListener('hoveron', this.hoverOnHandler);
        dragControls.addEventListener('hoveroff', this.hoverOffHandler);
    }

    static register(mesh) {
        meshes.push(mesh);
    }

    static hoverOnHandler({ object }) {
        object.userData.instance.hoverOnHandler();
    }
    
    static hoverOffHandler({ object }) {
        object.userData.instance.hoverOffHandler();
    }
}

export { InteractionService };