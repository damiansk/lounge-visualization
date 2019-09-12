import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findFirstMesh, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Bookcase } from '../primitives';

const fileName = 'bookcase.gltf';

class BookcaseFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBookcase$ = this.createBookcase$.bind(this);
    this.createBookcases$ = this.createBookcases$.bind(this);
  }

  createBookcase$(config) {
    return this.loaderService.loadGLTF$(fileName).pipe(
      map(findFirstMesh),
      map(obj => {
        obj.castShadow = true;
        obj.name = 'Bookcase';
        return obj;
      }),
      map(applyConfig(config)),
      map(obj => new Bookcase(obj))
    );
  }

  createBookcases$(configs) {
    return from(configs).pipe(map(this.createBookcase$));
  }
}

export { BookcaseFactory };
