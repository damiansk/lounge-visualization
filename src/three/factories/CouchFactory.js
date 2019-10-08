import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findFirstMesh, applyConfig, getMeshOrGroup } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Couch } from '../primitives';

const fileName = 'couch.gltf';

class CouchFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createCouch$ = this.createCouch$.bind(this);
    this.createCouches$ = this.createCouches$.bind(this);
  }

  createCouch$(config) {
    return this.loaderService.loadGLTF$(fileName).pipe(
      map(getMeshOrGroup),
      map(obj => {
        obj.castShadow = true;
        obj.name = 'Couch';
        return obj;
      }),
      map(applyConfig(config)),
      map(obj => new Couch(obj))
    );
  }

  createCouches$(configs) {
    return from(configs).pipe(map(this.createCouch$));
  }
}

export { CouchFactory };
