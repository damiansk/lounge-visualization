import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { SphereGeometry, MeshBasicMaterial, Mesh, PointLight } from 'three';
import { fixPosition, applyConfig, findRoot } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { Lamp } from '../primitives';

const fileName = 'rv_lamp_post_2';

class LampFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createLamp$ = this.createLamp$.bind(this);
    this.createLamps$ = this.createLamps$.bind(this);
  }

  createLamp$(config) {
    return this.loaderService.loadOBJ$(fileName).pipe(
      map(findRoot),
      map(obj => {
        obj.scale.set(0.2, 0.2, 0.2);

        // TODO Refactor - better way to attach sphere with light
        const geometry = new SphereGeometry(1.5, 64, 64);
        const material = new MeshBasicMaterial({ color: 0xffffff });
        const sphere = new Mesh(geometry, material);
        sphere.position.y = 18;
        obj.add(sphere);
        
        const pointLight = new PointLight('#ccffcc');
        pointLight.distance = 15;
        pointLight.position.y = 18;
        pointLight.castShadow = true; 
  
        obj.add(pointLight);

        obj.name = 'Lamp';

        return obj;
      }),
      map(fixPosition),
      map(applyConfig(config)),
      map(obj => new Lamp(obj))
    );
  }

  createLamps$(configs) {
    return from(configs).pipe(map(this.createLamp$));
  }
}

export { LampFactory };
