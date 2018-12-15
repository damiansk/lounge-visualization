import { Math as THREEMath } from 'three';
import { InteractiveModel } from '../abstract/InteractiveModel';

class Chair extends InteractiveModel {
  constructor(mesh) {
    super();
    this.mesh = mesh;
    mesh.scale.set(0.01, 0.01, 0.01);
    mesh.rotateX(-90 * THREEMath.DEG2RAD);
  }
}

export { Chair };
