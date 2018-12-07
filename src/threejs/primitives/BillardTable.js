import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class BillardTable {
  constructor(scene, config) {

    const { position } = config;

    LoaderService.loadOBJ('10523_Pool_Table_v1_L3')
      .then(model => {
        console.log(model);
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this.mesh = child;
            this.mesh.userData = { instance: this };
            
            this.mesh.scale.set(0.011, 0.011, 0.011);
            this.mesh.rotateX(-90 * THREE.Math.DEG2RAD);

            const boundingBox = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.set(
              position.x,
              Math.abs(boundingBox.min.y),
              position.z
            );

            scene.add(this.mesh);
          }
        });
      })
  }
}

export { BillardTable }