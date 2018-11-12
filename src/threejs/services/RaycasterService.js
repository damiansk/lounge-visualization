import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const meshes = new Set();
let prevIntersect = null;

class RaycasterService {
    static register(mesh) {
        meshes.add(mesh);
    }

    static unregister(mesh) {
        // TODO tricky
        meshes.delete(mesh);
    }

    static scan(mouse, camera) {
        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(Array.from(meshes));
        const intersect = intersects[0];

        if(intersect && (intersect !== prevIntersect)) {
            if(prevIntersect) {
                prevIntersect.object.userData.instance.onMouseLeave();
            }
            prevIntersect = intersect;
            prevIntersect.object.userData.instance.onMouseEnter();
        } else if(!intersect) {
            if(prevIntersect) {
                prevIntersect.object.userData.instance.onMouseLeave();
                prevIntersect = null;
            }
        }
    }
}

export { RaycasterService };