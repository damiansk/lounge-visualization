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
                        this.mesh = child;
                        this.mesh.userData = {
                            instance: this
                        };

                        this.mesh.scale.set(0.25, 0.25, 0.25)
                        const boundingBox = new THREE.Box3().setFromObject(this.mesh);
                        if (config.rotation) {
                            this.mesh.rotateY(config.rotation * THREE.Math.DEG2RAD);
                        }
                        this.mesh.position.set(
                            config.position.x,
                            Math.abs(boundingBox.min.y),
                            config.position.z
                        );

                        scene.add(this.mesh);
                        InteractionService.register(this.mesh);
                    }
                });
            });

        this.hoverOnHandler = this.hoverOnHandler.bind(this);
        this.hoverOffHandler = this.hoverOffHandler.bind(this);
    }

    hoverOnHandler() {
        this.mesh.material.color.set(0x123123);
    }

    hoverOffHandler() {
        this.mesh.material.color.set(0x987987);
    }
}

export {
    Barstool
}