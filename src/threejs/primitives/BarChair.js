import { InteractiveModel } from '../abstract/InteractiveModel';

class BarChair extends InteractiveModel {
    constructor(mesh) {
        super();
        this.mesh = mesh;
        mesh.scale.set(0.25, 0.25, 0.25);
    }
}

export { BarChair };