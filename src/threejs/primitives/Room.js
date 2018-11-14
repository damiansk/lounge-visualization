import * as THREE from 'three';
import { Floor } from './Floor';
import { FurnitureFactory } from '../factories/FurnitureFactory';

const example = {
    "objects": [
        {
            "type": "chair",
            "config": {
                "position": {
                    "x": 2,
                    "z": -2
                }
            }
        },
        {
            "type": "chair",
            "config": {
                "position": {
                    "x": 2,
                    "z": -1
                }
            }
        }
    ]
}

class Room {
    constructor(scene) {
        // TODO Ogarnąć przekazywane atrybuty
        this._mesh = new THREE.Object3D();
        this._mesh.add(new THREE.AxesHelper(5));

        new Floor(this._mesh);

        example.objects.forEach(object => {
            FurnitureFactory.createObject(this._mesh, object)
        });

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