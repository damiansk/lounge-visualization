import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { LoaderService } from '../services/ObjectLoaderService';
import {
  ChairFactory,
  TableFactory,
  PoolTableFactory,
  BarChairFactory
} from './index';

class ModelsFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.barChairFactory = new BarChairFactory(this.loadingManager);
    this.chairFactory = new ChairFactory(this.loadingManager);
    this.poolTableFactory = new PoolTableFactory(this.loadingManager);
    this.tableFactory = new TableFactory(this.loadingManager);

    this.createModels = this.createModels.bind(this);
    this.createFloor = this.createFloor.bind(this);
  }

  createModels(modelsConfig) {
    return from(modelsConfig)
      .pipe(
        map(({ configs, type }) => {
          switch (type) {
            case 'chair':
              return this.chairFactory.createChairs(configs);
            case 'table':
              return this.tableFactory.createTables(configs);
            case 'pool_table':
              return this.poolTableFactory.createPoolTables(configs);
            case 'bar_chair':
              return this.barChairFactory.createBarChairs(configs);
            default:
              return Observable.create();
          }
        }),
        mergeMap(data => from(data)),
        mergeAll()
      );
  }

  createFloor() {
    return this.loaderService.loadOBJ('floor2');
  }
}

export { ModelsFactory };
