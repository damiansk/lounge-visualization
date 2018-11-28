import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import { InteractionService } from '../services/InteractionService';

class Microwave {
  constructor(scene, position) {

    LoaderService.loadOBJ('Microwave_v1')
      .then(model => {
        model.traverse(child => {
          if(child instanceof THREE.Mesh) {
            this._mesh = child;
            this._mesh.userData = { instance: this };
            
            this._mesh.scale.set(0.0125, 0.0125, 0.0125);
            this._mesh.rotateX(-90 * THREE.Math.DEG2RAD);

            const boundingBox = new THREE.Box3().setFromObject(this._mesh);
            this._mesh.position.set(
              position.x,
              Math.abs(boundingBox.min.y),
              position.z
            );

            scene.add(this._mesh);
            InteractionService.register(this._mesh);
          }
        });
    });

    this.hoverOnHandler = this.hoverOnHandler.bind(this);
    this.hoverOffHandler = this.hoverOffHandler.bind(this);
  }

  hoverOnHandler() {
    this._mesh.material.color.set(0x123123);
  }

  hoverOffHandler() {
      this._mesh.material.color.set(0x987987);
  }
}

export { Microwave }