import { Math as THREEMath } from 'three';

class Microwave {
  constructor(mesh) {
    this.mesh = mesh;
    mesh.scale.set(0.0125, 0.0125, 0.0125);
    mesh.rotateX(-90 * THREEMath.DEG2RAD);
  }
}

export { Microwave };
