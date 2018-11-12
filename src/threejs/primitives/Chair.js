import * as THREE from 'three';
import { RaycasterService } from '../services/RaycasterService';

class Chair {
    constructor(scene) {
        // TODO create service for fetching models
        const loader = new THREE.ObjectLoader();

        loader.load('assets/chair.json', mesh => {
            this._mesh = mesh;
            
            const boundingBox = new THREE.Box3().setFromObject(mesh);
            mesh.position.y = Math.abs(boundingBox.min.y);

            // TODO Should replace by Box?
            mesh.children[0].children[0].userData = { instance: this };
            mesh.children[0].children[0].geometry.computeBoundingBox(); 
            debugger;

            scene.add(mesh);
            // RaycasterService.register(mesh.children[0].children[0]);
        });

        this.onMouseEnter = this.onMouseEnter.bind(this);
    }

    update(time) { }

    onMouseEnter() {
        if(this._isHovered) {
            this._isHovered = true;
            // rest of the logic
            // this._mesh.children[0].children[0].material.color.setHex(0xd3d3d3);
        }
    }
}

export { Chair };