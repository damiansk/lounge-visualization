import * as THREE from 'three';
import OBJLoader from 'three-obj-loader';
OBJLoader(THREE);


class LoaderService {
    static loadOBJ(path, callback) {
        loader.load(path, callback);
    }
}

LoaderService.THREE = THREE;
const loader = new LoaderService.THREE.OBJLoader();

export { LoaderService };