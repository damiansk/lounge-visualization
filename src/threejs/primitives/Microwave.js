import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class Microwave {
  constructor(scene, config) {

    LoaderService.loadOBJ('Microwave_v1')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this._mesh = child;
            this._mesh.userData = { instance: this };
            
            this._mesh.scale.set(0.0125, 0.0125, 0.0125);
            this._mesh.rotateX(-90 * THREE.Math.DEG2RAD);
            if (config.rotation) {
              this._mesh.rotateZ(config.rotation * THREE.Math.DEG2RAD);
            }
            const boundingBox = new THREE.Box3().setFromObject(this._mesh);
            this._mesh.position.set(
              config.position.x,
              Math.abs(boundingBox.min.y),
              config.position.z
            );

            scene.add(this._mesh);
          }
        });
    });
  }
}

export { Microwave }