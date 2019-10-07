import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { getMeshOrGroup, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Chair } from '../primitives';

const fileName = 'chair.gltf';

class ChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadChair$ = this.loadChair$.bind(this);
    this.createChair$ = this.createChair$.bind(this);
    this.createChairs$ = this.createChairs$.bind(this);
  }

  loadChair$() {
    if (!this.loadingChairCache$) {
      this.loadingChairCache$ = this.loaderService.loadGLTF$(fileName).pipe(
        map(getMeshOrGroup),
        map(obj => {
          obj.castShadow = true;
          obj.name = 'Chair';
          return obj;
        }),
        shareReplay(1),
        map(obj => {
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

          return clonedObj;
        })
      );
    }

    return this.loadingChairCache$;
  }

  createChair$(config) {
    return this.loadChair$().pipe(
      map(applyConfig(config)),
      map(obj => new Chair(obj))
    );
  }

  createChairs$(configs) {
    return from(configs).pipe(map(this.createChair$));
  }
}

export { ChairFactory };
