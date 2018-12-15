import { Mesh, Box3, Math as THREEMath } from 'three';
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
    modelsConfig.forEach(model => {
      const { configs } = model;

      switch (model.type) {
        case 'chair':
          configs.forEach(config => this.createChair(config, callback));
          break;
        case 'microwave':
          configs.forEach(config => this.createMicrowave(config, callback));
          break;
        case 'table':
          configs.forEach(config => this.createTable(config, callback));
          break;
        case 'bar_chair':
          configs.forEach(config => this.createBarChair(config, callback));
          break;
        case 'pool_table':
          configs.forEach(config => this.createPoolTable(config, callback));
          break;
        case 'floor':
          this.createFloor(callback);
          break;
        default:
          break;
      }
    });
  }

  createChair(config, callback) {
    LoaderService.loadObject('chair', this.loadingManager).then(model => {
      const mesh = findMainMesh(model);
      const chair = new Chair(mesh);
      setConfig(mesh, config);
      callback(chair);
    });
  }

  createMicrowave(config, callback) {
    LoaderService.loadOBJ('microwave', this.loadingManager).then(model => {
      const mesh = findMainMesh(model);
      const microwave = new Microwave(mesh);
      setConfig(mesh, config);
      callback(microwave);
    });
  }

  createTable(config, callback) {
    LoaderService.loadOBJ('table', this.loadingManager).then(model => {
      const table = new Table(model);
      setConfig(model, config);
      callback(table);
    });
  }

  createBarChair(config, callback) {
    LoaderService.loadOBJ('bar_chair', this.loadingManager).then(model => {
      const mesh = findMainMesh(model);
      const barChair = new BarChair(mesh);
      setConfig(mesh, config);
      callback(barChair);
    });
  }

  createPoolTable(config, callback) {
    LoaderService.loadOBJ('pool_table', this.loadingManager).then(model => {
      const mesh = findMainMesh(model);
      const poolTable = new PoolTable(mesh);
      setConfig(mesh, config);
      callback(poolTable);
    });
  }

  createFloor(callback) {
    LoaderService.loadOBJ('floor', this.loadingManager).then(model => {
      const floor = new Floor(model);
      setConfig(model);
      callback(floor);
    });
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
