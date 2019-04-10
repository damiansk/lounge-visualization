import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Sofa } from '../primitives';

const fileName = 'HSM0012';

class SofaFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createSofa$ = this.createSofa$.bind(this);
    this.createSofas$ = this.createSofas$.bind(this);
  }

  createSofa$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.02, 0.012, 0.012);
        obj.castShadow = true;
        obj.name = 'Sofa';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Sofa(obj))
    );
  }

  createSofas$(configs) {
    return from(configs).pipe(map(this.createSofa$));
  }
}

export { SofaFactory };
