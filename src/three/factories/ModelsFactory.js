import { Mesh, Box3, Math as THREEMath } from 'three';
import { from, of, forkJoin, combineLatest, zip } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, flatMap, withLatestFrom, mergeMap, concatMap } from 'rxjs/operators';
import { LoaderService } from '../services/ObjectLoaderService';
import {
  Chair,
  Microwave,
  Table,
  Floor,
  BarChair,
  PoolTable,
} from '../primitives';

class ModelsFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);
  }

  createModels(modelsConfig) {
    return from(modelsConfig)
      .pipe(
        map(this.createModels1),
        mergeAll()
      );
  }

  createModels1 = ({ configs, type }) => {
    let observable;

    switch (type) {
      case 'chair':
        observable = this.createChair(configs);
        break;
      // case 'microwave':
      //   return from(configs.map(this.createMicrowave.bind(this)));
      case 'table':
        observable = this.createTable(configs);
        break;
      // case 'bar_chair':
      //   return from(configs.map(this.createBarChair.bind(this)));
      // case 'pool_table':
      //   return from(configs.map(this.createPoolTable.bind(this)));
      default:
        observable = Observable.create();
    }

    return observable
      .pipe(mergeMap(from));
  }

  createFloor() {
    return this.loaderService.loadOBJ('floor2');
  }

  createChair(configs) {
    return this.loaderService.loadJSON('chair')
      .pipe(
        map(findMainMesh),
        map(obj => {
          obj.scale.set(0.01, 0.01, 0.01);
          obj.rotateX(-90 * THREEMath.DEG2RAD);
          fixYPosition(obj);
          return configs.map(config => new Chair(setConfig(obj.clone(), config)));
        })
      );
  }

  createTable(configs) {
    return this.loaderService.loadOBJ('table')
      .pipe(
        map(obj => {
          obj.scale.set(0.007, 0.007, 0.007);
          obj.rotateZ(90 * THREEMath.DEG2RAD);
          fixYPosition(obj);
          return configs.map(config => new Table(setConfig(obj.clone(), config)));
        })
        // flatMap(model => {
        //   const table = new Table(model);
        //   setConfig(model, config);
          
        //   return table;
        // })
      );
  }








  createMicrowave(config, callback) {
    return LoaderService.loadOBJ('microwave', this.loadingManager)
      // .subscribe(model => {
      //   const mesh = findMainMesh(model);
      //   const microwave = new Microwave(mesh);
      //   setConfig(mesh, config);
      //   callback(microwave);
      // });
  }

  createBarChair(config, callback) {
    return LoaderService.loadOBJ('bar_chair', this.loadingManager)
      // .subscribe(model => {
      //   const mesh = findMainMesh(model);
      //   const barChair = new BarChair(mesh);
      //   setConfig(mesh, config);
      //   callback(barChair);
      // });
  }

  createPoolTable(config, callback) {
    return LoaderService.loadOBJ('pool_table', this.loadingManager)
      // .subscribe(model => {
      //   const mesh = findMainMesh(model);
      //   const poolTable = new PoolTable(mesh);
      //   setConfig(mesh, config);
      //   callback(poolTable);
      // });
  }
}

function findMainMesh(model) {
  let mesh;

  model.traverse(child => {
    if (child instanceof Mesh) {
      mesh = child;
    }
  });

  return mesh;
}

function fixYPosition(mesh) {
  const boundingBox = new Box3().setFromObject(mesh);
  mesh.position.y = Math.abs(boundingBox.min.y);

  return mesh;
}

function setConfig(mesh, config = {}) {
  // const boundingBox = new Box3().setFromObject(mesh);
  // mesh.position.y = Math.abs(boundingBox.min.y);

  if (config.position) {
    mesh.position.x = config.position.x;
    mesh.position.z = config.position.z;
  }

  if (config.rotation) {
    mesh.rotateZ(config.rotation * THREEMath.DEG2RAD);
  }

  return mesh;
}

export { ModelsFactory };
