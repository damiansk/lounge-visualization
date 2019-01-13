import { Mesh, Box3, Math as THREEMath } from 'three';
import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { LoaderService } from '../services/ObjectLoaderService';
import {
  Chair,
  Table,
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
        map(this.loadModels),
        mergeAll()
      );
  }

  loadModels = ({ configs, type }) => {
    let observable;

    switch (type) {
      case 'chair':
        observable = this.loadChair(configs);
        break;
      case 'table':
        observable = this.loadTable(configs);
        break;
      case 'bar_chair':
        observable = this.loadBarChair(configs);
        break;
      case 'pool_table':
        observable = this.loadPoolTable(configs);
        break;
      default:
        return Observable.create();
    }

    return observable
      .pipe(mergeMap(from));
  }

  createFloor() {
    return this.loaderService.loadOBJ('floor2');
  }

  loadChair(configs) {
    return this.loaderService.loadJSON('chair')
      .pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.01, 0.01, 0.01);
          obj.rotateX(-90 * THREEMath.DEG2RAD);
          fixPosition(obj);
          return configs.map(config => new Chair(applyConfig(obj.clone(), config)));
        })
      );
  }

  loadTable(configs) {
    return this.loaderService.loadOBJ('table')
      .pipe(
        map(obj => {
          obj.scale.set(0.007, 0.007, 0.007);
          obj.rotateZ(90 * THREEMath.DEG2RAD);
          fixPosition(obj);
          return configs.map(config => new Table(applyConfig(obj.clone(), config)));
        })
      );
  }

  loadPoolTable(configs) {
    return this.loaderService.loadOBJ('pool_table')
      .pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.011, 0.011, 0.011);
          obj.rotateX(-90 * THREEMath.DEG2RAD);
          fixPosition(obj);
          return configs.map(config => new PoolTable(applyConfig(obj.clone(), config)));
        })
      );
  }

  loadBarChair(configs) {
    return this.loaderService.loadOBJ('bar_chair')
      .pipe(
        map(findRoot),
        map(obj => {
          obj.scale.set(0.25, 0.25, 0.25);
          fixPosition(obj);
          return configs.map(config => new BarChair(applyConfig(obj.clone(), config)));
        })
      );
  }
}

function findRoot(model) {
  let mesh;

  model.traverse(child => {
    if (child instanceof Mesh) {
      mesh = child;
    }
  });

  return mesh;
}

function fixPosition(mesh) {
  const boundingBox = new Box3().setFromObject(mesh)
  const boundingBoxSize = boundingBox.max.sub(boundingBox.min);
  const height = boundingBoxSize.y;
  mesh.position.y = height / 2;

  return mesh;
}

function applyConfig(mesh, config = {}) {
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
