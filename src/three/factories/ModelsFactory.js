import { from } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { Group } from 'three';
import { LoaderService } from '../services/ObjectLoaderService';
import {
  ChairFactory,
  CouchFactory,
  TableFactory,
  BarTableFactory,
  PoolTableFactory,
  BarChairFactory,
  LampFactory,
  BookcaseFactory,
  SofaFactory,
  ClosetFactory,
} from './index';
import { FridgeFactory } from "./FridgeFactory";

class ModelsFactory {
  static modelsToGroup(meshes) {
    const group = new Group();

    meshes.map(obj => {
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
  }

  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.barChairFactory = new BarChairFactory(this.loadingManager);
    this.couchFactory = new CouchFactory(this.loadingManager);
    this.chairFactory = new ChairFactory(this.loadingManager);
    this.poolTableFactory = new PoolTableFactory(this.loadingManager);
    this.tableFactory = new TableFactory(this.loadingManager);
    this.barTableFactory = new BarTableFactory(this.loadingManager);
    this.lampFactory = new LampFactory(this.loadingManager);
    this.bookcaseFactory = new BookcaseFactory(this.loadingManager);
    this.sofaFactory = new SofaFactory(this.loadingManager);
    this.couchFactory = new CouchFactory(this.loadingManager);
    this.closetFactory = new ClosetFactory(this.loadingManager);
    this.fridgeFactory = new FridgeFactory(this.loadingManager);

    this.createModels$ = this.createModels$.bind(this);
    this.createFloor$ = this.createFloor$.bind(this);
  }

  createModels$(modelsConfig) {
    return from(modelsConfig).pipe(
      map(({ configs, type }) => {
        switch (type) {
          case 'chair':
            return this.chairFactory.createChairs$(configs);
          case 'couch':
            return this.couchFactory.createCouches$(configs);
          case 'table':
            return this.tableFactory.createTables$(configs);
          case 'bar_table':
            return this.barTableFactory.createBarTables$(configs);
          case 'pool_table':
            return this.poolTableFactory.createPoolTables$(configs);
          case 'bar_chair':
            return this.barChairFactory.createBarChairs$(configs);
          case 'lamp':
            return this.lampFactory.createLamps$(configs);
          case 'bookcase':
            return this.bookcaseFactory.createBookcases$(configs);
          case 'sofa':
            return this.sofaFactory.createSofas$(configs);
          case 'couch':
            return this.couchFactory.createCouches$(configs);
          case 'closet_simple':
            return this.closetFactory.createSimpleClosets$(configs);
          case 'closet_with_sink':
            return this.closetFactory.createClosetsWithSink$(configs);
          case 'closet_dishwasher':
            return this.closetFactory.createClosetsWithDishwasher$(configs);
          case 'big_fridge':
            return this.fridgeFactory.createBigFridges$(configs);
          case 'sodas_fridge':
            return this.fridgeFactory.createSodasFridges$(configs);
          case 'thin_fridge':
            return this.fridgeFactory.createThinFridges$(configs);
          default:
            return Observable.create();
        }
      }),
      // Important arrow function - in other case (eg. with simple reference) rxjs returns error
      mergeMap(data => from(data)),
      mergeAll()
    );
  }

  createFloor$() {
    return this.loaderService.loadGLTF$('floor_new.gltf');
  }
}

export { ModelsFactory };
