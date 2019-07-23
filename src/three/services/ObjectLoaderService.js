import { ObjectLoader } from 'three';
import { bindCallback } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { OBJLoader } from '../libs/obj-loader';
import { MTLLoader } from '../libs/mtl-loader';
import { DRACOLoader } from '../libs/draco-loader';
import { GLTFLoader } from '../libs/gltf-loader';

const basePath = 'assets/';

DRACOLoader.setDecoderPath('decoder/');
DRACOLoader.getDecoderModule();

class LoaderService {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;

    this.loadOBJ$ = this.loadOBJ$.bind(this);
    this.loadMTL$ = this.loadMTL$.bind(this);
    this.loadJSON$ = this.loadJSON$.bind(this);
  }

  loadOBJ$(fileName) {
    const objLoader = new OBJLoader(this.loadingManager);
    objLoader.setPath(basePath);
    const file = `${fileName}.obj`;

    return this.loadMTL$(fileName).pipe(
      flatMap(materials => {
        materials.preload();
        objLoader.setMaterials(materials);

        return bindCallback(objLoader.load.bind(objLoader))(file);
      })
    );
  }

  loadMTL$(fileName) {
    const mtlLoader = new MTLLoader(this.loadingManager);
    mtlLoader.setPath(basePath);
    const file = `${fileName}.mtl`;

    return bindCallback(mtlLoader.load.bind(mtlLoader))(file);
  }

  loadGLTF$(fileName) {
    const gltfLoader = new GLTFLoader(this.loadingManager);
    gltfLoader.setDRACOLoader(new DRACOLoader());
    gltfLoader.setPath(basePath);

    return bindCallback(gltfLoader.load.bind(gltfLoader))(fileName);
  }

  loadJSON$(fileName) {
    const objectLoader = new ObjectLoader(this.loadingManager);
    const file = `${basePath}${fileName}.json`;

    return bindCallback(objectLoader.load.bind(objectLoader))(file);
  }
}

export { LoaderService };
