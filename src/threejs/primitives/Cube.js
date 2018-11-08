import * as THREE from 'three';

class Cube {
    constructor(scene) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x969696 });
        this.__mesh = new THREE.Mesh(geometry, material);

        this.__mesh.add(new THREE.AxesHelper(5));

        const outlineMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });
        const outlineMesh = new THREE.Mesh( geometry, outlineMaterial );

        scene.add(this.__mesh);
        scene.add(outlineMesh);
    }

    update(time) {}
}

export { Cube };