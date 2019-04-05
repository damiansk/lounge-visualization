import { of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { PointLight } from 'three';
import { applyConfig } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { LightBulb } from '../primitives';

class LightBulbFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createLightBulb$ = this.createLightBulb$.bind(this);
    this.createLightBulbs$ = this.createLightBulbs$.bind(this);
  }

  createLightBulb$(config) {
    const light = new PointLight('#ccffcc');
    light.distance = 15;
    light.castShadow = true;

    return of(light).pipe(
      map(applyConfig(config)),
      map(obj => new LightBulb(obj))
    );
  }

  createLightBulbs$(configs) {
    return from(configs).pipe(map(this.createLightBulb$));
  }
}

export { LightBulbFactory };
