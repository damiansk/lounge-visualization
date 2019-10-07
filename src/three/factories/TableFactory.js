import { from, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { getMeshOrGroup, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Table } from '../primitives';
import { Group } from 'three';

const fileName = 'table.gltf';

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
      this.loadingTable$ = this.loaderService.loadGLTF$(fileName).pipe(
        tap(console.log),
        map(obj => obj.scene.children),
        map(meshes => {
          meshes.forEach(obj => {
            obj.castShadow = true;
            obj.name = 'Table';
          });
          return meshes;
        }),
        // mergeAll(),
        shareReplay(1),
        map(tableMeshes => {
          const group = new Group();

          tableMeshes.map(obj => {
            const clonedObj = obj.clone();

            if (clonedObj.material) {
              if (Array.isArray(clonedObj.material)) {
                clonedObj.material = clonedObj.material.map(material =>
                  material.clone()
                );
              } else {
                clonedObj.material = clonedObj.material.clone();
              }
            }

            group.add(clonedObj);
          });

          return group;
        })
      );
    }

    return this.loadingTable$;
  }

  createTable$(config) {
    return this.loadTable$().pipe(
      map(applyConfig(config)),
      map(obj => new Table(obj))
    );
  }

  createTables$(configs) {
    return from(configs).pipe(map(this.createTable$));
  }
}

export { TableFactory };
