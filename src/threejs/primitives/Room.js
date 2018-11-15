import * as THREE from 'three';
import { Floor } from './Floor';
import { FurnitureFactory } from '../factories/FurnitureFactory';
import map from '../../Config/roomMap';

class Room {
    constructor(scene) {
        // TODO Ogarnąć przekazywane atrybuty
        this._mesh = new THREE.Object3D();
        this._mesh.add(new THREE.AxesHelper(5));

        new Floor(this._mesh);

        FurnitureFactory.createObject(this._mesh, map)

        // TODO Outline geometry should be the same like floor geometry
        const geometry = new THREE.BoxGeometry(8, 3, 20);
        const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        const outlineMesh = new THREE.Mesh(geometry, outlineMaterial );

        const outlineMeshHeight = outlineMesh.geometry.parameters.height;
        outlineMesh.position.y = outlineMeshHeight/2;

        this._mesh.add(outlineMesh);

        scene.add(this._mesh);
    }

    update(time) {
        
    }
}

export { Room };