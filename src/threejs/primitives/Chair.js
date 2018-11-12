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

            mesh.traverse(child => {
                if(child instanceof THREE.Mesh) {
                    // TODO Should replace by Box?
                    const basicMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 1 });

                    child.material = basicMaterial;
                    child.userData = { instance: this };
                    child.geometry.computeBoundingBox(); 

                    RaycasterService.register(child);
                }
            });

            scene.add(mesh);
        });

        this.onMouseEnter = this.onMouseEnter.bind(this);
    }

    update(time) { }

    onMouseEnter() {
        this._mesh.traverse(child => {
            if(child instanceof THREE.Mesh) {
                debugger;
                child.material.color.setHex(0xd3d3d3);
            }
        });
    }

    onMouseLeave() {
        this._mesh.traverse(child => {
            if(child instanceof THREE.Mesh) {
                child.material.color.setHex(0x000000);
            }
        });
    }
}

export { Chair };