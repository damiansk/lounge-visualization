import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class Floor {
    constructor(scene) {
        LoaderService.loadOBJ('/assets/kantyna.obj', mesh => {
            mesh.traverse(child => {
                if (child instanceof THREE.Mesh) {
                  // TODO Should replace by Box?
                //   const basicMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, opacity: 1, side: THREE.DoubleSide });
        
                //   child.material = basicMaterial;
                }
            });
            mesh.scale.set(3, 3, 3);
            scene.add(mesh);
        });

        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);
    }

    update(time) {}

    onMouseEnter() {
        this._mesh.material.color.setHex(0xd3d3d3);
    }
    
    onMouseLeave() {
        this._mesh.material.color.setHex(0xffff00);
    }
}

export { Floor };