import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { fixPosition, applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarTable } from '../primitives';

class BarTableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBarTable = this.createBarTable.bind(this);
    this.createBarTables = this.createBarTables.bind(this);
  }

  createBarTable(config) {
    return this.loaderService.loadOBJ('Wooden_Table_2').pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.015, 0.015, 0.01);
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new BarTable(obj))
    );
  }

  createBarTables(configs) {
    return from(configs).pipe(map(this.createBarTable));
  }
}

export { BarTableFactory };
