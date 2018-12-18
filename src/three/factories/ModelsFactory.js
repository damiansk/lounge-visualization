import { Mesh, Box3, Math as THREEMath } from 'three';
import { from, of } from 'rxjs';
import { map, mergeAll, flatMap } from 'rxjs/operators';
import * as LoaderService from '../services/ObjectLoaderService';
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
  }

  createModels(modelsConfig, callback) {
    // modelsConfig.forEach(model => {
    //   const { configs } = model;
    //   switch (model.type) {
    //     case 'chair':
    //       configs.map(config => this.createChair(config, callback));
    //       break;
    //     case 'microwave':
    //       configs.forEach(config => this.createMicrowave(config, callback));
    //       break;
    //     case 'table':
    //       configs.forEach(config => this.createTable(config, callback));
    //       break;
    //     case 'bar_chair':
    //       configs.forEach(config => this.createBarChair(config, callback));
    //       break;
    //     case 'pool_table':
    //       configs.forEach(config => this.createPoolTable(config, callback));
    //       break;
    //     default:
    //       break;
    //   }
    // });

    from(modelsConfig)
      .pipe(
        map(item => this.createModels1(item)),
        map(models => models.pipe(mergeAll())),
        mergeAll()
      )
      .subscribe(val => {
        callback(val);
      });
  }

  createModels1 = ({ configs, type }) => {
    switch (type) {
      case 'chair':
        return from(configs.map(this.createChair.bind(this)));
      case 'microwave':
        return from(configs.map(this.createMicrowave.bind(this)));
      case 'table':
        return from(configs.map(this.createTable.bind(this)));
      case 'bar_chair':
        return from(configs.map(this.createBarChair.bind(this)));   
      case 'pool_table':
        return from(configs.map(this.createPoolTable.bind(this)));
    }
  };

  createChair(config, callback) {
    return LoaderService.loadObject('chair', this.loadingManager)
      .pipe(flatMap(model => {
        const mesh = findMainMesh(model);
        const chair = new Chair(mesh);
        setConfig(mesh, config);

        return chair;
      }));
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

  createTable(config, callback) {
    return LoaderService.loadOBJ('table', this.loadingManager)
      .pipe(flatMap(model => {
        const table = new Table(model);
        setConfig(model, config);
        
        return table;
      }));
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

  createFloor(callback) {
    return LoaderService.loadOBJ('floor', this.loadingManager)
      // .subscribe(model => {
      //   const floor = new Floor(model);
      //   setConfig(model);
      //   callback(floor);
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

function setConfig(mesh, config = {}) {
  const boundingBox = new Box3().setFromObject(mesh);
  mesh.position.y = Math.abs(boundingBox.min.y);

  if (config.position) {
    mesh.position.x = config.position.x;
    mesh.position.z = config.position.z;
  }

  if (config.rotation) {
    mesh.rotateZ(config.rotation * THREEMath.DEG2RAD);
  }
}

export { ModelsFactory };
