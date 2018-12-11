import { InteractionModel } from '../abstract/InteractionModel';

class BarChair extends InteractionModel {
    constructor(mesh) {
        super();
        this.mesh = mesh;
        mesh.scale.set(0.25, 0.25, 0.25);
    }
}

export { BarChair };