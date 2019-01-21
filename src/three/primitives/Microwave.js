import { Math as TMath } from 'three';

class Microwave {
  constructor(mesh) {
    this.mesh = mesh;
    mesh.scale.set(0.0125, 0.0125, 0.0125);
    mesh.rotateX(-90 * TMath.DEG2RAD);
  }
}

export { Microwave };
