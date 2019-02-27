import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarChair } from '../primitives';

const fileName = 'bar_chair';

class BarChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadBarChair$ = this.loadBarChair$.bind(this);
    this.createBarChair$ = this.createBarChair$.bind(this);
    this.createBarChairs$ = this.createBarChairs$.bind(this);
  }

  loadBarChair$() {
    if(!this.loadingBarChairCache$) {
      this.loadingBarChairCache$ = this.loaderService.loadOBJ$(fileName)
        .pipe(
          map(findRoot),
          map(obj => {
            obj.scale.set(0.23, 0.23, 0.23);
            obj.castShadow = true;
            obj.name = 'Bar chair';
            return obj;
          }),
          map(fixPosition),
          shareReplay(1),
          map(obj => {
            const clonedObj = obj.clone();
            clonedObj.material = clonedObj.material.clone();
            return clonedObj;
          })
        );
    }

    return this.loadingBarChairCache$;
  }

  createBarChair$(config) {
    return this.loadBarChair$().pipe(
      map(applyConfig(config)),
      map(obj => new BarChair(obj))
    );
  }

  createBarChairs$(configs) {
    return from(configs).pipe(map(this.createBarChair$));
  }
}

export { BarChairFactory };
