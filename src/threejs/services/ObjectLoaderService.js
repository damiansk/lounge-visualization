import * as THREE from 'three';
import OBJLoader from 'obj-loader';
import MTLLoader from 'mtl-loader';

const objLoader = new OBJLoader();
const mtlLoader = new MTLLoader();
const objectLoader = new THREE.ObjectLoader();
objLoader.setPath('assets/');
mtlLoader.setPath('assets/');
// objectLoader.setPath('assets/');

class LoaderService {
    static loadOBJ(name) {
        const file = `${name}.obj`;

        return new Promise(resolve => {
            this.loadMTL(name)
                .then(materials => {
                    materials.preload();
                    objLoader.setMaterials(materials);
                    objLoader.load(file, resolve);
                });
        });
    }

    static loadMTL(name) {
        const file = `${name}.mtl`;

        return new Promise(resolve => mtlLoader.load(file, resolve));
    }

    static loadObject(name) {
        const file = `assets/${name}.json`;

        return new Promise(resolve => objectLoader.load(file, resolve));
    }
}


export { LoaderService };