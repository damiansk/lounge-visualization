import * as THREE from 'three';
import { bindCallback } from 'rxjs';
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

    return bindCallback(objLoader.load.bind(objLoader))(file);
  }

  loadMTL(fileName) {
    const mtlLoader = new MTLLoader(this.loadingManager);
    mtlLoader.setPath(basePath);
    const file = `${fileName}.mtl`;
  
    return bindCallback(mtlLoader.load.bind(mtlLoader))(file);
  };
  
  loadJSON(fileName) {
    const objectLoader = new THREE.ObjectLoader(this.loadingManager);
    const file = `${basePath}${fileName}.json`;
  
    return bindCallback(objectLoader.load.bind(objectLoader))(file);
  };
}



const loadOBJ = (fileName, loadManager) => {
  const objLoader = new OBJLoader(loadManager);
  objLoader.setPath(basePath);
  const file = `${fileName}.obj`;


  // return loadMTL(fileName, loadManager).pipe(
  //   map(materials => {
  //     materials.preload();
  //     objLoader.setMaterials(materials);

        return bindCallback(objLoader.load.bind(objLoader))(file);
    // })
  // )

  // return new Promise(resolve => {
  //   loadMTL(fileName, loadManager).subscribe(materials => {
  //     materials.preload();
  //     objLoader.setMaterials(materials);
  //     objLoader.load(file, resolve);
  //   });
  // });
};

const loadMTL = (fileName, loadManager) => {
  const mtlLoader = new MTLLoader(loadManager);
  mtlLoader.setPath(basePath);
  const file = `${fileName}.mtl`;

  return bindCallback(mtlLoader.load.bind(mtlLoader))(file);
};

const loadObject = (fileName, loadManager) => {
  const objectLoader = new THREE.ObjectLoader(loadManager);
  const file = `${basePath}${fileName}.json`;

  return bindCallback(objectLoader.load.bind(objectLoader))(file);
};

// export { loadOBJ, loadMTL, loadObject };
export { LoaderService };
