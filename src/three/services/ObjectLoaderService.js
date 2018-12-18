import * as THREE from 'three';
import { bindCallback } from 'rxjs';
import { OBJLoader } from '../libs/obj-loader';
import { MTLLoader } from '../libs/mtl-loader';

const basePath = 'assets/';

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
  // objectLoader.setPath('assets/');
  const file = `${basePath}${fileName}.json`;

  return bindCallback(objectLoader.load.bind(objectLoader))(file);
};

export { loadOBJ, loadMTL, loadObject };
