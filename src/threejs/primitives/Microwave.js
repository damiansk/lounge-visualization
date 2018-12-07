import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import { InteractionService } from '../services/InteractionService';

class Microwave {
  constructor(scene, config) {
    const { position } = config;

    LoaderService.loadOBJ('Microwave_v1')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this.mesh = child;
            this.mesh.userData = { instance: this };
            
            this.mesh.scale.set(0.0125, 0.0125, 0.0125);
            this.mesh.rotateX(-90 * THREE.Math.DEG2RAD);

            const boundingBox = new THREE.Box3().setFromObject(this.mesh);
            this.mesh.position.set(
              position.x,
              Math.abs(boundingBox.min.y),
              position.z
            );

            scene.add(this.mesh);
            InteractionService.register(this.mesh);
          }
        });
    });
  }
}

export { Microwave }