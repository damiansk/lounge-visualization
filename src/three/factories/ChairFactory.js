import { from } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Chair } from '../primitives';

const fileName = 'chair';

class ChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadChair$ = this.loadChair$.bind(this);
    this.createChair$ = this.createChair$.bind(this);
    this.createChairs$ = this.createChairs$.bind(this);
  }

  loadChair$() {
    if (!this.loadingChairCache$) {
      this.loadingChairCache$ = this.loaderService.loadOBJ$(fileName).pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.045, 0.045, 0.045);
          obj.castShadow = true;
          obj.name = 'Chair';
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

    return this.loadingChairCache$;
  }

  createChair$(config) {
    return this.loadChair$().pipe(
      map(applyConfig(config)),
      map(obj => new Chair(obj))
    );
  }

  createChairs$(configs) {
    return from(configs).pipe(map(this.createChair$));
  }
}

export { ChairFactory };
