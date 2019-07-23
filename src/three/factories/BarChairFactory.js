import { from } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { findFirstMesh, applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { BarChair } from '../primitives';

const fileName = 'bar_chair.gltf';

class BarChairFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.loadBarChair$ = this.loadBarChair$.bind(this);
    this.createBarChair$ = this.createBarChair$.bind(this);
    this.createBarChairs$ = this.createBarChairs$.bind(this);
  }

  loadBarChair$() {
    if (!this.loadingBarChairCache$) {
      this.loadingBarChairCache$ = this.loaderService.loadGLTF$(fileName).pipe(
        map(findFirstMesh),
        map(mesh => {
          mesh.castShadow = true;
          mesh.name = 'Bar chair';
          return mesh;
        }),
        shareReplay(1),
        map(obj => {
          const clonedObj = obj.clone();
          clonedObj.material = clonedObj.material.clone();
          return clonedObj;
        })
      );
    }

    return this.loadingBarChairCache$;
  }

  createBarChair$(config) {
    return this.loadBarChair$().pipe(
      map(applyConfig(config)),
      map(obj => new BarChair(obj))
    );
  }

  createBarChairs$(configs) {
    return from(configs).pipe(map(this.createBarChair$));
  }
}

export { BarChairFactory };
