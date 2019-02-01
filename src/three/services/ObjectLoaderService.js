import * as THREE from 'three';
import { bindCallback } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { OBJLoader } from '../libs/obj-loader';
import { MTLLoader } from '../libs/mtl-loader';

const basePath = 'assets/';

class LoaderService {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;

    this.loadOBJ = this.loadOBJ.bind(this);
    this.loadMTL = this.loadMTL.bind(this);
    this.loadJSON = this.loadJSON.bind(this);
  }

  loadOBJ(fileName) {
    const objLoader = new OBJLoader(this.loadingManager);
    objLoader.setPath(basePath);
    const file = `${fileName}.obj`;

    return this.loadMTL(fileName).pipe(
      flatMap(materials => {
        materials.preload();
        objLoader.setMaterials(materials);

        return bindCallback(objLoader.load.bind(objLoader))(file);
      })
    );
  }

  loadMTL(fileName) {
    const mtlLoader = new MTLLoader(this.loadingManager);
    mtlLoader.setPath(basePath);
    const file = `${fileName}.mtl`;

    return bindCallback(mtlLoader.load.bind(mtlLoader))(file);
  }

  loadJSON(fileName) {
    const objectLoader = new THREE.ObjectLoader(this.loadingManager);
    const file = `${basePath}${fileName}.json`;

    return bindCallback(objectLoader.load.bind(objectLoader))(file);
  }
}

export { LoaderService };
