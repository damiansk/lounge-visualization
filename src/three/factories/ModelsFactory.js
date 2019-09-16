import { combineLatest, from } from 'rxjs';
import {
  TextureLoader,
  Mesh,
  NearestFilter,
  RepeatWrapping,
  LinearMipMapLinearFilter,
  MeshStandardMaterial,
  MeshBasicMaterial,
} from 'three';
import { Observable } from 'rxjs/Observable';
import { map, mergeAll, mergeMap, tap } from 'rxjs/operators';
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

  // move to loader service
  static getTexture$(path) {
    return Observable.create(observer => {
      new TextureLoader().load(path, texture => {
        observer.next(texture);
      });
    });
  }

  static loadTexture(path) {
    const textureLoader = new TextureLoader();

    return textureLoader.load(path);
  }

  createFloor$() {
    return this.loaderService.loadGLTF$('floor2.gltf').pipe(
      map(findFirstMesh),
      tap(mesh => {
        const material = new MeshStandardMaterial({
          map: ModelsFactory.loadTexture('assets/carpet.jpg'),
          bumpMap: ModelsFactory.loadTexture('assets/noise.jpg'),
          bumpMapScale: 0.01,
          roughness: 0.8,
        });

        mesh.material.clone(material);
        mesh.material.needsUpdate = true;
      })
    );
    // return combineLatest(
    //   this.loaderService.loadGLTF$('floor2.gltf'),
    //   ModelsFactory.getTexture$('assets/noise.jpg'),
    //   ModelsFactory.getTexture$('assets/carpet.jpg')
    // ).pipe(
    //   map(([ scene, bumpMap, texture ]) =>({
    //     model: findFirstMesh(scene),
    //     bumpMap,
    //     texture
    //   })),
    //   map((res) => {
    //     const { model, bumpMap, texture } = res;

    //     // Bring this back to tile the carpet on the floor (repeat the pattern)
    //     texture.wrapS = RepeatWrapping;
    //     texture.wrapT = RepeatWrapping;
    //     texture.repeat.set(10, 10);
    //     bumpMap.wrapS = RepeatWrapping;
    //     bumpMap.wrapT = RepeatWrapping;
    //     texture.minFilter = LinearMipMapLinearFilter;
    //     texture.maxFilter = LinearMipMapLinearFilter;
    //     bumpMap.repeat.set(10,10);

    //     texture.minFilter = NearestFilter;
    //     texture.maxFilter = NearestFilter;

    //     const material = new MeshStandardMaterial({ map: texture, bumpMap, bumpMapScale: .01, roughness: 0.8 })
    //     model.material.copy(material);

    //     return model;
    //   })
    // );
  }
}

export { ModelsFactory };
