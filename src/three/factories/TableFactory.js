import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { fixPosition, applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Table } from '../primitives';

class TableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createTable$ = this.createTable$.bind(this);
    this.createTables$ = this.createTables$.bind(this);
  }

  createTable$(config) {
    return this.loaderService.loadOBJ$('Wooden_Table_2').pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.01, 0.01, 0.01);
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
