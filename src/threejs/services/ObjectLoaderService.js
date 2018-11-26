import * as THREE from 'three';
import OBJLoader from 'obj-loader';
import MTLLoader from 'mtl-loader';

const objectLoader = new THREE.ObjectLoader();
// objectLoader.setPath('assets/');

class LoaderService {
    static loadOBJ(name) {
        const objLoader = new OBJLoader();
        objLoader.setPath('assets/');
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
        const mtlLoader = new MTLLoader();
        mtlLoader.setPath('assets/');
        const file = `${name}.mtl`;

        return new Promise(resolve => mtlLoader.load(file, resolve));
    }

    static loadObject(name) {
        const file = `assets/${name}.json`;

        return new Promise(resolve => objectLoader.load(file, resolve));
    }
}


export { LoaderService };