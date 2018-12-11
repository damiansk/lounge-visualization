import { Math as THREEMath } from 'three';
import { InteractionModel } from '../abstract/InteractionModel';

class Chair extends InteractionModel {
    constructor(mesh) {
        super();
        this.mesh = mesh;
        mesh.scale.set(0.01, 0.01, 0.01);
        mesh.rotateX(-90 * THREEMath.DEG2RAD);
    }
}

export { Chair };