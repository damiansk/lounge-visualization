import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import { InteractionService } from '../services/InteractionService';

class Chair {
    constructor(scene, config) {
        const { position } = config;

        LoaderService.loadObject('chair')
            .then(model => {
                model.traverse(child => {
                    if(child instanceof THREE.Mesh) {
                        this._mesh = child;
                        child.userData = { instance: this };
                        
                        child.scale.set(0.01, 0.01, 0.01);
                        child.rotateX(-90 * THREE.Math.DEG2RAD);
                        
                        const boundingBox = new THREE.Box3().setFromObject(this._mesh);

                        this._mesh.position.set(
                            position.x,
                            Math.abs(boundingBox.min.y),
                            position.z
                        );

                        scene.add(child);
                        InteractionService.register(child);
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

export { Chair };