import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Bookcase } from '../primitives';

class BookcaseFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBookcase = this.createBookcase.bind(this);
    this.createBookcases = this.createBookcases.bind(this);
  }

  createBookcase(config) {
    return this.loaderService.loadOBJ('20357_Cube_Bookcase_v1 Textured').pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.125, 0.125, 0.125);
        obj.rotateX(-90 * TMath.DEG2RAD);
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Bookcase(obj))
    );
  }

  createBookcases(configs) {
    return from(configs).pipe(map(this.createBookcase));
  }
}

export { BookcaseFactory };
