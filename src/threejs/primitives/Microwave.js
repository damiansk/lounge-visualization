import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class Microwave {
  constructor(scene, config) {

    LoaderService.loadOBJ('Microwave_v1')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this.mesh = child;
            this.mesh.userData = { instance: this };
            
            this.mesh.scale.set(0.0125, 0.0125, 0.0125);
            this.mesh.rotateX(-90 * THREE.Math.DEG2RAD);
            if (config.rotation) {
              this.mesh.rotateZ(config.rotation * THREE.Math.DEG2RAD);
            }
            const boundingBox = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.set(
              config.position.x,
              Math.abs(boundingBox.min.y),
              config.position.z
            );

            scene.add(this.mesh);
          }
        });
    });
  }
}

export { Microwave }