import * as THREE from 'three';
import { Floor } from './Floor';
import { FurnitureFactory } from '../factories/FurnitureFactory';
import map from '../config/models.json';

class Room {
    constructor(scene) {
        this._mesh = new THREE.Object3D();

        // Temporary light
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
        directionalLight.position.set( 0, 90, -60 );
        this._mesh.add( directionalLight );

        new Floor(this._mesh);

        FurnitureFactory.createObject(this._mesh, map);

        scene.add(this._mesh);
    }

    update(time) {
        
    }
}

export { Room };