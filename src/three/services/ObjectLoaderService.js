import * as THREE from 'three';
import { OBJLoader } from '../libs/obj-loader';
import { MTLLoader } from '../libs/mtl-loader';

const basePath = 'assets/';

const loadOBJ = (fileName, loadManager) => {
  const objLoader = new OBJLoader(loadManager);
  objLoader.setPath(basePath);
  const file = `${fileName}.obj`;

  return new Promise(resolve => {
    loadMTL(fileName, loadManager).then(materials => {
      materials.preload();
      objLoader.setMaterials(materials);
      objLoader.load(file, resolve);
    });
  });
};

const loadMTL = (fileName, loadManager) => {
  const mtlLoader = new MTLLoader(loadManager);
  mtlLoader.setPath(basePath);
  const file = `${fileName}.mtl`;

  return new Promise(resolve => mtlLoader.load(file, resolve));
};

const loadObject = (fileName, loadManager) => {
  const objectLoader = new THREE.ObjectLoader(loadManager);
  // objectLoader.setPath('assets/');
  const file = `${basePath}${fileName}.json`;

  return new Promise(resolve => objectLoader.load(file, resolve));
};

export { loadOBJ, loadMTL, loadObject };
