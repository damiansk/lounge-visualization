import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class BillardTable {
  constructor(scene, config) {

    LoaderService.loadOBJ('10523_Pool_Table_v1_L3')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this._mesh = child;
            this._mesh.userData = { instance: this };

            this._mesh.scale.set(0.011, 0.011, 0.011);
            this._mesh.rotateX(-90 * THREE.Math.DEG2RAD);
            if(config.rotation) {
              this._mesh.rotateZ(config.rotation * THREE.Math.DEG2RAD);
            }
            this._mesh.position.set(
              config.position.x,
              0,
              config.position.z
            );

            scene.add(this._mesh);
          }
        });
      })
  }
}

export { BillardTable }