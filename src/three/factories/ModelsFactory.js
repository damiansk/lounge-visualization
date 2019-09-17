import { combineLatest, from } from 'rxjs';
import {
  NearestFilter,
  RepeatWrapping,
  MeshStandardMaterial,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  DirectionalLight,
  FrontSide,
} from 'three';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap } from 'rxjs/operators';
import { findFirstMesh } from './utils';
import { LoaderService } from '../services/LoaderService';
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

  createFloor$() {
    return combineLatest(
      this.loaderService.loadGLTF$('floor2.gltf'),
      this.loaderService.loadTexture$('assets/carpet.jpg')
    ).pipe(
      map(([scene, texture]) => ({
        model: findFirstMesh(scene),
        texture,
      })),
      map(res => {
        const { model, texture } = res;

        // For repeat strategy
        // texture.wrapS = RepeatWrapping;
        // texture.wrapT = RepeatWrapping;
        // texture.minFilter = NearestFilter;
        // texture.maxFilter = NearestFilter;

        const material = new MeshStandardMaterial({
          map: texture,
          roughness: 0.8,
        });

        model.material = material;
        model.material.needsUpdate = true;

        return model;
      })
    );
  }

  createEnvironment$() {
    // TODO Refactor
    return this.loaderService.loadTexture$('assets/panorama.jpg').pipe(
      map(texture => {
        const geometry = new SphereGeometry(31, 36, 20);
        const material = new MeshBasicMaterial({
          map: texture,
          side: FrontSide,
        });
        geometry.scale(-1, 1, 1);
        const sphere = new Mesh(geometry, material);

        const directionalLight = new DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0, 90, -60);

        return [sphere, directionalLight];
      })
    );
  }
}

export { ModelsFactory };
