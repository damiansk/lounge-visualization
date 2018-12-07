import * as THREE from 'three';
import {
    LoaderService
} from '../services/ObjectLoaderService';

class Table {
    constructor(scene, config) {
        LoaderService.loadOBJ('table')
            .then(model => {
                this.mesh = model;
                this.mesh.scale.set(0.007, 0.007, 0.007);
                const basicMaterial =  new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });
                this.mesh.material = basicMaterial;
                this.mesh.userData = {
                    instance: this
                };
                if (config.rotation) {
                    this.mesh.rotateY(config.rotation * THREE.Math.DEG2RAD);
                }
                const boundingBox = new THREE.Box3().setFromObject(this.mesh);
                this.mesh.position.set(
                    config.position.x,
                    Math.abs(boundingBox.min.y),
                    config.position.z
                );

                scene.add(this.mesh);
            });
    }
}

export { Table };