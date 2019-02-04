import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Math as TMath } from 'three';
import { fixPosition, applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarTable } from '../primitives';

const fileName = 'Wooden_Table_2';

class BarTableFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBarTable$ = this.createBarTable$.bind(this);
    this.createBarTables$ = this.createBarTables$.bind(this);
  }

  createBarTable$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.015, 0.015, 0.01);
        obj.name = 'Bar table';
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
      map(obj => new BarTable(obj))
    );
  }

  createBarTables$(configs) {
    return from(configs).pipe(map(this.createBarTable$));
  }
}

export { BarTableFactory };
