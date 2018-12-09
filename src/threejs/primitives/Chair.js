import { Math as THREEMath } from 'three';

class Chair {
    constructor(mesh) {
        this.mesh = mesh;
        mesh.scale.set(0.01, 0.01, 0.01);
        mesh.rotateX(-90 * THREEMath.DEG2RAD);
    }
}

export { Chair };