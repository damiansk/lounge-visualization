import * as THREE from 'three';
import { Floor } from './Floor';
import { FurnitureFactory } from '../factories/FurnitureFactory';
import map from '../config/models.json';

class Room {
    constructor(scene) {
        this.mesh = new THREE.Object3D();

        // Temporary light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 90, -60 );
        this.mesh.add( directionalLight );

        new Floor(this.mesh);

        FurnitureFactory.createObject(this.mesh, map);

        scene.add(this.mesh);
    }

    update(time) {
        
    }
}

export { Room };