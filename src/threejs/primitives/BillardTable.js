import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class BillardTable {
  constructor(scene, position) {

    LoaderService.loadOBJ('10523_Pool_Table_v1_L3')
      .then(model => {
        console.log(model);
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this._mesh = child;
            this._mesh.userData = { instance: this };
            
            this._mesh.scale.set(0.011, 0.011, 0.011);
            this._mesh.rotateX(-90 * THREE.Math.DEG2RAD);

            const boundingBox = new THREE.Box3().setFromObject(this._mesh);
            this._mesh.position.set(
              position.x,
              Math.abs(boundingBox.min.y),
              position.z
            );

            scene.add(this._mesh);
          }
        });
      })
  }
}

export { BillardTable }