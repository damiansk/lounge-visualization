import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Chair } from '../primitives';

const fileName = 'chair';

class ChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createChair$ = this.createChair$.bind(this);
    this.createChairs$ = this.createChairs$.bind(this);
  }

  createChair$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.045, 0.045, 0.045);
        obj.castShadow = true;
        obj.name = 'Chair';
        obj.type = 'chair';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Chair(obj))
    );
  }

  createChairs$(configs) {
    return from(configs).pipe(map(this.createChair$));
  }
}

export { ChairFactory };
