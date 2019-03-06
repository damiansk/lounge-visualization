import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findRoot, fixPosition, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { PoolTable } from '../primitives';

const fileName = 'pool_table';

class PoolTableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createPoolTable$ = this.createPoolTable$.bind(this);
    this.createPoolTables$ = this.createPoolTables$.bind(this);
  }

  createPoolTable$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.011, 0.011, 0.011);
        obj.castShadow = true;
        obj.name = 'Pool table';
        obj.type = 'pool_table';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new PoolTable(obj))
    );
  }

  createPoolTables$(configs) {
    return from(configs).pipe(map(this.createPoolTable$));
  }
}

export { PoolTableFactory };
