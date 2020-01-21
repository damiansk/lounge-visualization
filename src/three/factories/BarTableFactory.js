import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { getMeshOrGroup, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarTable } from '../primitives';

const fileName = 'bar_table.gltf';

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
      this.loadingBarTable$ = this.loaderService.loadGLTF$(fileName).pipe(
        map(getMeshOrGroup),
        map(mesh => {
          mesh.castShadow = true;
          mesh.name = 'Bar table';
          return mesh;
        }),
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
