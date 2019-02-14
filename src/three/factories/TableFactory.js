import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { fixPosition, findRoot, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Table } from '../primitives';

const fileName = 'Wooden_Table_2';

class TableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createTable$ = this.createTable$.bind(this);
    this.createTables$ = this.createTables$.bind(this);
  }

  createTable$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.01, 0.01, 0.01);
        obj.castShadow = true;
        obj.name = 'Table';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Table(obj))
    );
  }

  createTables$(configs) {
    return from(configs).pipe(map(this.createTable$));
  }
}

export { TableFactory };
