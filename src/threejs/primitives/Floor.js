import * as THREE from 'three';
import { RaycasterService } from '../services/RaycasterService';

class Floor {
    constructor(scene) {
        const loader = new THREE.OBJLoader('/assets/kantyna.obj');

        // TODO Ogarnąć przekazywane atrybuty
        const geometry = new THREE.PlaneGeometry(8, 20, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.rotateX((90 * Math.PI)/180);
        this._mesh.userData = { instance: this };

        scene.add(this._mesh);

        // RaycasterService.register(this._mesh);

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