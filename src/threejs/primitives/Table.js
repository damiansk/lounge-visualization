import { Math as THREEMath } from 'three';
import { InteractionModel } from '../abstract/InteractionModel';

class Table extends InteractionModel {
    constructor(mesh) {
        super();
        this.mesh = mesh;
        mesh.scale.set(0.007, 0.007, 0.007);
        mesh.rotateZ(90 * THREEMath.DEG2RAD);
    }
}

export { Table };