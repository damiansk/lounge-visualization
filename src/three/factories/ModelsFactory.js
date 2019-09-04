import { combineLatest, from } from 'rxjs';
import {
  TextureLoader,
  Mesh,
  DoubleSide,
  RepeatWrapping,
  PlaneGeometry,
  MeshBasicMaterial
} from 'three';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { findFirstMesh } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import {
  ChairFactory,
  TableFactory,
  BarTableFactory,
  PoolTableFactory,
  BarChairFactory,
  LampFactory,
  BookcaseFactory,
  SofaFactory,
} from './index';

class ModelsFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.barChairFactory = new BarChairFactory(this.loadingManager);
    this.chairFactory = new ChairFactory(this.loadingManager);
    this.poolTableFactory = new PoolTableFactory(this.loadingManager);
    this.tableFactory = new TableFactory(this.loadingManager);
    this.barTableFactory = new BarTableFactory(this.loadingManager);
    this.lampFactory = new LampFactory(this.loadingManager);
    this.bookcaseFactory = new BookcaseFactory(this.loadingManager);
    this.sofaFactory = new SofaFactory(this.loadingManager);

    this.createModels$ = this.createModels$.bind(this);
    this.createFloor$ = this.createFloor$.bind(this);
  }

  createModels$(modelsConfig) {
    return from(modelsConfig).pipe(
      map(({ configs, type }) => {
        switch (type) {
          case 'chair':
            return this.chairFactory.createChairs$(configs);
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
          default:
            return Observable.create();
        }
      }),
      // Important arrow function - in other case (eg. with simple reference) rxjs returns error
      mergeMap(data => from(data)),
      mergeAll()
    );
  }

  getTexture$(path) {
    return Observable.create(observer => {
      new TextureLoader().load(path, texture => {
        observer.next(texture);
        observer.complete();
      });
    });
  }

  createFloor$() {
    return combineLatest(
      this.loaderService.loadGLTF$('floor.gltf'),
      this.getTexture$('assets/carpet.jpg')
    ).pipe(
      map(([scene, texture]) =>({ model: findFirstMesh(scene), texture})),
      map((res) => {
        const { model, texture } = res;
        // TARGET FLOOR GEOMETRY - to check ho to properly display the texture
        // const geometry = model.geometry;

        // TEMP GEOMETRY - erase when solved proper floor model texture display
        const geometry = new PlaneGeometry(20, 40, 30);
        const mesh = new Mesh(geometry, new MeshBasicMaterial({ map: texture, side: DoubleSide }));
        mesh.rotateX(Math.PI/2); //ONLY TEMPORARILY - WITH THE PLANE

        return mesh;
      })
    );
  }
}

export { ModelsFactory };
