import * as THREE from 'three';
import { RaycasterService } from '../services/RaycasterService';

class Chair {
    constructor(scene) {
        // TODO create service for fetching models
        const loader = new THREE.ObjectLoader();

        loader.load('assets/chair.json', mesh => {
            this._mesh = mesh;

            // this._boundingBox = new THREE.BoxHelper( mesh, 0xffff00 );
            // const meshHeight = Math.abs(this._boundingBox.max.y) + Math.abs(this._boundingBox.min.y);
            // mesh.position.y = meshHeight/2;
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            mesh.position.y = Math.abs(boundingBox.min.y);

            scene.add(mesh);

            // RaycasterService.register(this._boundingBox);
        });
    }

    update(time) { }
}

export { Chair };