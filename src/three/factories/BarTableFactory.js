import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { fixPosition, findRoot, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarTable } from '../primitives';

const fileName = 'Wooden_Table_2';

class BarTableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadBarTable$ = this.loadBarTable$.bind(this);
    this.createBarTable$ = this.createBarTable$.bind(this);
    this.createBarTables$ = this.createBarTables$.bind(this);
  }

  loadBarTable$() {
    if (!this.loadingBarTable$) {
      this.loadingBarTable$ = this.loaderService.loadOBJ$(fileName).pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.015, 0.015, 0.01);
          obj.castShadow = true;
          obj.name = 'Bar table';
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

    return this.loadingBarTable$;
  }

  createBarTable$(config) {
    return this.loadBarTable$().pipe(
      map(applyConfig(config)),
      map(obj => new BarTable(obj))
    );
  }

  createBarTables$(configs) {
    return from(configs).pipe(map(this.createBarTable$));
  }
}

export { BarTableFactory };
