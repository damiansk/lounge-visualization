import * as THREE from 'three';

class Floor {
    constructor(scene) {
        // TODO Ogarnąć przekazywane atrybuty
        const geometry = new THREE.PlaneGeometry(8, 20, 32);
        const material = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });

        this._mesh = new THREE.Mesh(geometry, material);
        this._mesh.rotateX((90 * Math.PI)/180);

        scene.add(this._mesh);
    }

    update(time) {}
}

export { Floor };