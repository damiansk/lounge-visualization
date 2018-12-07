import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class BillardTable {
  constructor(scene, config) {

    LoaderService.loadOBJ('10523_Pool_Table_v1_L3')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this.mesh = child;
            this.mesh.userData = { instance: this };

            this.mesh.scale.set(0.011, 0.011, 0.011);
            this.mesh.rotateX(-90 * THREE.Math.DEG2RAD);
            if(config.rotation) {
              this.mesh.rotateZ(config.rotation * THREE.Math.DEG2RAD);
            }
            this.mesh.position.set(
              config.position.x,
              0,
              config.position.z
            );

            scene.add(this.mesh);
          }
        });
      })
  }
}

export { BillardTable }