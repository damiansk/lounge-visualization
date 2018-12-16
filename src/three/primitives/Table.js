import { Math as THREEMath } from 'three';

class Table {
  isInteractive = true;

  constructor(mesh) {
    this.mesh = mesh;
    mesh.scale.set(0.007, 0.007, 0.007);
    mesh.rotateZ(90 * THREEMath.DEG2RAD);
  }
}

export { Table };
