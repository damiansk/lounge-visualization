import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarChair } from '../primitives';

const fileName = 'bar_chair';

class BarChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBarChair$ = this.createBarChair$.bind(this);
    this.createBarChairs$ = this.createBarChairs$.bind(this);
  }

  createBarChair$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.23, 0.23, 0.23);
        obj.castShadow = true;
        obj.name = 'Bar chair';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new BarChair(obj))
    );
  }

  createBarChairs$(configs) {
    return from(configs).pipe(map(this.createBarChair$));
  }
}

export { BarChairFactory };
