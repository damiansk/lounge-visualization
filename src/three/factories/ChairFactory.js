import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Math as TMath, AxesHelper } from 'three';
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
        // var axesHelper = new AxesHelper( 151 );
        // obj.add( axesHelper );
        // obj.rotateX(-90 * TMath.DEG2RAD);
        obj.castShadow = true;
        obj.name = 'Chair';
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
