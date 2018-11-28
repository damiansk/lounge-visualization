import * as THREE from 'three';
import {
    LoaderService
} from '../services/ObjectLoaderService';

class Table {
    constructor(scene, config) {
        const {
            position
        } = config;

        LoaderService.loadOBJ('table')
            .then(model => {
                console.log(model);
                this._mesh = model;
                this._mesh.scale.set(0.007, 0.007, 0.007);
                const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });
                this._mesh.material = basicMaterial;
                this._mesh.userData = {
                    instance: this
                };

                const boundingBox = new THREE.Box3().setFromObject(this._mesh);
                this._mesh.position.set(
                    position.x,
                    Math.abs(boundingBox.min.y),
                    position.z
                );

                scene.add(this._mesh);
            });
    }
}

export { Table };