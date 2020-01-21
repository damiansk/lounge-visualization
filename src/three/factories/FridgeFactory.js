import { from } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { LoaderService } from "../services/ObjectLoaderService";
import { applyConfig, getMeshOrGroup } from "./utils";

import { BigFridge } from "../primitives/BigFridge";
import { SodasFridge } from '../primitives/SodasFridge';
import { ThinFridge } from '../primitives/ThinFridge';

const bigFridgeFileName = 'big_fridge.gltf';
const sodasFridgeFileName = 'wine_fridge.gltf';
const thinFridgeFileName = 'thin_fridge.gltf';

class FridgeFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBigFridge$ = this.createBigFridge$.bind(this);
    this.createSodasFridge$ = this.createSodasFridge$.bind(this);
    this.createThinFridge$ = this.createThinFridge$.bind(this);
    this.createBigFridges$ = this.createBigFridges$.bind(this);
    this.createSodasFridges$ = this.createSodasFridges$.bind(this);
    this.createThinFridges$ = this.createThinFridges$.bind(this);
  }

  createBigFridge$(config) {
    return this.loaderService.loadGLTF$(bigFridgeFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
          group.castShadow = true;
          group.name = 'Big Fridge';
        return group;
      }),
      map(applyConfig(config)),
      map(obj => new BigFridge(obj))
    );
  }

  createSodasFridge$(config) {
    return this.loaderService.loadGLTF$(sodasFridgeFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
        group.castShadow = true;
        group.name = 'Sodas Fridge';

        const glass = group.children.find(child => child.name === 'glass');

        glass.material.transparent = true;
        glass.material.opacity = 0.6;
        glass.material.refractionRatio = 0.9;

        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new SodasFridge(obj))
    );
  }

  createThinFridge$(config) {
    return this.loaderService.loadGLTF$(thinFridgeFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
        group.castShadow = true;
        group.name = 'Thin Fridge';

        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new ThinFridge(obj))
    );
  }

  createSodasFridges$(configs) {
    return from(configs).pipe(map(this.createSodasFridge$));
  }

  createBigFridges$(configs) {
    return from(configs).pipe(map(this.createBigFridge$));
  }

  createThinFridges$(configs) {
    return from(configs).pipe(map(this.createThinFridge$));
  }
}

export { FridgeFactory };
