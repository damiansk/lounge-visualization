import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { findFirstMesh, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { PoolTable } from '../primitives';

const fileName = 'pool_table.gltf';

class PoolTableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createPoolTable$ = this.createPoolTable$.bind(this);
    this.createPoolTables$ = this.createPoolTables$.bind(this);
  }

  createPoolTable$(config) {
    return this.loaderService.loadGLTF$(fileName).pipe(
      map(findFirstMesh),
      map(obj => {
        obj.castShadow = true;
        obj.name = 'Pool table';
        return obj;
      }),
      map(applyConfig(config)),
      map(obj => new PoolTable(obj))
    );
  }

  createPoolTables$(configs) {
    return from(configs).pipe(map(this.createPoolTable$));
  }
}

export { PoolTableFactory };
