import * as THREE from 'three';
import { Floor } from './Floor';
import { FurnitureFactory } from '../factories/FurnitureFactory';
import map from '../config/models.json';

class Room {
    constructor(scene) {
        this._mesh = new THREE.Object3D();

        // Temporary light
        const light = new THREE.PointLight( 0xffffff, 1, 100 );
        light.position.set( 0, 30, 0 );
        this._mesh.add( light );

        new Floor(this._mesh);

        FurnitureFactory.createObject(this._mesh, map);

        var axesHelper = new THREE.AxesHelper( 50 );
        this._mesh.add( axesHelper );
        scene.add(this._mesh);
    }

    update(time) {
        
    }
}

export { Room };