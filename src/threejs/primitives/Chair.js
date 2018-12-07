import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import { InteractionService } from '../services/InteractionService';

class Chair {
    constructor(scene, config) {

        LoaderService.loadObject('chair')
            .then(model => {
                model.traverse(child => {
                    if(child instanceof THREE.Mesh) {
                        this.mesh = child;
                        child.userData = { instance: this };
                        
                        child.scale.set(0.01, 0.01, 0.01);
                        child.rotateX(-90 * THREE.Math.DEG2RAD);
                        if(config.rotation) {
                            this.mesh.rotateZ(config.rotation * THREE.Math.DEG2RAD);
                        }
                        const boundingBox = new THREE.Box3().setFromObject(this.mesh);

                        this.mesh.position.set(
                            config.position.x,
                            Math.abs(boundingBox.min.y),
                            config.position.z
                        );

                        scene.add(child);
                        InteractionService.register(child);
                    }
                });
            });
    }
}

export { Chair };