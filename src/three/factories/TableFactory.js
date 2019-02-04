import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { fixPosition, applyConfig, findRoot } from './utils';
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
        obj.name = 'Table';
        return obj;
      }),
      map(fixPosition),
      // map(applyConfig(config)),
      // TODO: Fix rotation axis (default is Z)
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
