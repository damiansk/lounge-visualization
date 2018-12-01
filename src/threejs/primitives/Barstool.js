import * as THREE from 'three';
import {
    LoaderService
} from '../services/ObjectLoaderService';
import {
    InteractionService
} from '../services/InteractionService';

class Barstool {
    constructor(scene, config) {

        LoaderService.loadOBJ('Bar_chair_2')
            .then(model => {
                model.traverse(child => {
                    if (child instanceof THREE.Mesh) {
                        this._mesh = child;
                        this._mesh.userData = {
                            instance: this
                        };

                        this._mesh.scale.set(0.25, 0.25, 0.25)
                        const boundingBox = new THREE.Box3().setFromObject(this._mesh);
                        if (config.rotation) {
                            this._mesh.rotateY(config.rotation * THREE.Math.DEG2RAD);
                        }
                        this._mesh.position.set(
                            config.position.x,
                            Math.abs(boundingBox.min.y),
                            config.position.z
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

export {
    Barstool
}