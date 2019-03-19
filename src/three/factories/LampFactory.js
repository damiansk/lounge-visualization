import { DoubleSide } from 'three';
import { from } from 'rxjs';
import { map, tap, shareReplay } from 'rxjs/operators';
import { applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Lamp } from '../primitives';
import { LightBulbFactory } from './LighBulbFactory';

const fileName = 'lamp_v3';

class LampFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);
    this.lightFactory = new LightBulbFactory(this.loadingManager);

    this.createLamp$ = this.createLamp$.bind(this);
    this.createLamps$ = this.createLamps$.bind(this);
  }

  loadLamp$() {
    if (!this.loadingLamp$) {
      this.loadingLamp$ = this.loaderService.loadOBJ$(fileName).pipe(
        map(findRoot),
        map(obj => {
          obj.name = 'Lamp';
          obj.material.side = DoubleSide;
          return obj;
        }),
        shareReplay(1),
        map(obj => {
          const clonedObj = obj.clone();
          clonedObj.material = clonedObj.material.clone();
          return clonedObj;
        })
      );
    }

    return this.loadingLamp$;
  }

  createLamp$(config) {
    return this.loadLamp$().pipe(
      map(applyConfig(config)),
      map(obj => new Lamp(obj)),
      tap(obj => {
        const lightAltitude = 4.7;
        this.lightFactory
          .createLightBulb$({ position: { y: lightAltitude } })
          .subscribe(light => obj.addLight(light));
      })
    );
  }

  createLamps$(configs) {
    return from(configs).pipe(map(this.createLamp$));
  }
}

export { LampFactory };
