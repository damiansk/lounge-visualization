import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findFirstMesh, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Sofa } from '../primitives';

const fileName = 'sofa.gltf';

class SofaFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createSofa$ = this.createSofa$.bind(this);
    this.createSofas$ = this.createSofas$.bind(this);
  }

  createSofa$(config) {
    return this.loaderService.loadGLTF$(fileName).pipe(
      map(findFirstMesh),
      map(obj => {
        obj.castShadow = true;
        obj.name = 'Sofa';
        return obj;
      }),
      map(applyConfig(config)),
      map(obj => new Sofa(obj))
    );
  }

  createSofas$(configs) {
    return from(configs).pipe(map(this.createSofa$));
  }
}

export { SofaFactory };
