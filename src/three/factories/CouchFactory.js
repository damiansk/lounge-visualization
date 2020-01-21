import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Couch } from '../primitives';
import { ModelsFactory } from './ModelsFactory';

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
      map(obj => obj.scene.children),
      map(meshes => {
        meshes.forEach(obj => {
          obj.castShadow = true;
          obj.name = 'Couch';
        });
        return meshes;
      }),
      shareReplay(1),
      map(ModelsFactory.modelsToGroup),
      // tap(console.log),
      map(applyConfig(config)),
      map(obj => new Couch(obj))
    );
  }

  createCouches$(configs) {
    return from(configs).pipe(map(this.createCouch$));
  }
}

export { CouchFactory };
