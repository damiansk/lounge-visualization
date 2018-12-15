import { Math as THREEMath } from 'three';

class PoolTable {
  constructor(mesh) {
    this.mesh = mesh;
    mesh.scale.set(0.011, 0.011, 0.011);
    mesh.rotateX(-90 * THREEMath.DEG2RAD);
  }
}

export { PoolTable };
