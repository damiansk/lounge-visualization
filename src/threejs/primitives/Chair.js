import * as THREE from 'three';

class Chair {
    constructor(scene) {
        // TODO create service for fetching models
        const loader = new THREE.ObjectLoader();

        loader.load('assets/chair.json', mesh => {
            this._mesh = mesh;
            
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            const meshHeight = Math.abs(boundingBox.max.y) + Math.abs(boundingBox.min.y);
            mesh.position.y = meshHeight/2;

            scene.add(mesh);
        });
    }

    update(time) { }
}

export { Chair };