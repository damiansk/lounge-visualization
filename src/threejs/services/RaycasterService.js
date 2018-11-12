import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const meshes = new Set();

class RaycasterService {
    static register(mesh) {
        meshes.add(mesh);
    }

    static unregister(mesh) {
        // TODO tricky
        meshes.delete(mesh);
    }

    static scan(mouse, camera) {
        // console.log(mouse);
        // console.log(meshes);
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(Array.from(meshes));

        for ( var i = 0; i < intersects.length; i++ ) {
            console.log(intersects[i]);
        }
    }
}

export { RaycasterService };