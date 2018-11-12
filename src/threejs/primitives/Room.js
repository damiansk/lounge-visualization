import * as THREE from 'three';
import { Floor } from './Floor';
import { Chair } from './Chair';

class Room {
    constructor(scene) {
        // TODO Ogarnąć przekazywane atrybuty
        this._mesh = new THREE.Object3D();
        this._mesh.add(new THREE.AxesHelper(5));

        const floor = new Floor(this._mesh);
        const chair = new Chair(this._mesh);

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