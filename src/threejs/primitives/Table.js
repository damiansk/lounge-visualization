import * as THREE from 'three';
import {
    LoaderService
} from '../services/ObjectLoaderService';

class Table {
    constructor(scene, config) {
        LoaderService.loadOBJ('table')
            .then(model => {
                this._mesh = model;
                this._mesh.scale.set(0.007, 0.007, 0.007);
                const basicMaterial =  new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });
                this._mesh.material = basicMaterial;
                this._mesh.userData = {
                    instance: this
                };
                if (config.rotation) {
                    this._mesh.rotateY(config.rotation * THREE.Math.DEG2RAD);
                }
                const boundingBox = new THREE.Box3().setFromObject(this._mesh);
                this._mesh.position.set(
                    config.position.x,
                    Math.abs(boundingBox.min.y),
                    config.position.z
                );

                scene.add(this._mesh);
            });
    }
}

export {
    Table
}