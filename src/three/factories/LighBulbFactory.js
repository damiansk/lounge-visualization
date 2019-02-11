import { of, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SphereGeometry, MeshBasicMaterial, Mesh, PointLight } from 'three';
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
    // TODO Refactor - better way to attach sphere with light
    const light = new PointLight('#ccffcc');
    light.distance = 15;
    light.castShadow = true;

    const geometry = new SphereGeometry(1.5, 64, 64);
    const material = new MeshBasicMaterial({ color: 0xffffff });
    const bulb = new Mesh(geometry, material);

    light.add(bulb);

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
