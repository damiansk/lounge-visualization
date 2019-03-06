import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { fixPosition, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Table } from '../primitives';

const fileName = 'Wooden_Table_2';

class TableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadTable$ = this.loadTable$.bind(this);
    this.createTable$ = this.createTable$.bind(this);
    this.createTables$ = this.createTables$.bind(this);
  }

  loadTable$() {
    if (!this.loadingTable$) {
      this.loadingTable$ = this.loaderService.loadOBJ$(fileName).pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.01, 0.01, 0.01);
          obj.castShadow = true;
          obj.name = 'Table';
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

    return this.loadingTable$;
  }

  createTable$(config) {
    // TODO: Fix rotation axis (default is Z)
    return this.loadTable$().pipe(
      map(mesh => {
        if (config.position) {
          mesh.position.x = config.position.x;
          mesh.position.z = config.position.z;
        }

        if (config.rotation) {
          mesh.rotateY(config.rotation * TMath.DEG2RAD);
        }

        return mesh;
      }),
      map(obj => new Table(obj))
    );
  }

  createTables$(configs) {
    return from(configs).pipe(map(this.createTable$));
  }
}

export { TableFactory };
