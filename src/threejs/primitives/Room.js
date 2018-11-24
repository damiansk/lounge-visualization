import * as THREE from 'three';
import { LoaderService } from '../services/ObjectLoaderService';

class Room {
    constructor(scene) {
        // this._mesh = new THREE.Object3D();
        // this._mesh.add(new THREE.AxesHelper(5));

        // new Floor(this._mesh);

        // FurnitureFactory.createObject(this._mesh, map)

        // TODO Outline geometry should be the same like floor geometry
        // const geometry = new THREE.BoxGeometry(8, 3, 20);
        // const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        // const outlineMesh = new THREE.Mesh(geometry, outlineMaterial );

        // const outlineMeshHeight = outlineMesh.geometry.parameters.height;
        // outlineMesh.position.y = outlineMeshHeight/2;

        // this._mesh.add(outlineMesh);

        // scene.add(this._mesh);
        LoaderService.loadOBJ('kantyna', mesh => {
            this._mesh = mesh;
            mesh.scale.set(3, 3, 3);
            scene.add(mesh);
        });

        // Temporary light
        const light = new THREE.PointLight( 0xffffff, 1, 100 );
        light.position.set( 0, 30, 0 );
        scene.add( light );

    }

    update(time) {
        
    }
}

export { Room };