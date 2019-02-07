import { from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { fixPosition, applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Lamp } from '../primitives';
import { LightBulbFactory } from './LighBulbFactory';

const fileName = 'rv_lamp_post_2';

class LampFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);
    this.lightFactory = new LightBulbFactory(this.loadingManager);

    this.createLamp$ = this.createLamp$.bind(this);
    this.createLamps$ = this.createLamps$.bind(this);
  }

  createLamp$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.2, 0.2, 0.2);
        obj.name = 'Lamp';
        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Lamp(obj)),
      tap(obj => {
        // TODO fix magic number
        this.lightFactory
          .createLightBulb$({ position: { y: 18 } })
          .subscribe(light => obj.addLight(light));
      })
    );
  }

  createLamps$(configs) {
    return from(configs).pipe(map(this.createLamp$));
  }
}

export { LampFactory };
