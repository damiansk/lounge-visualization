import { LoaderService } from "../services/ObjectLoaderService";
import { map, shareReplay, tap } from "rxjs/operators";
import { ModelsFactory } from "./ModelsFactory";
import { applyConfig, getMeshOrGroup } from "./utils";
import { Couch } from "../primitives";
import { from } from "rxjs";
import { BigFridge } from "../primitives/BigFridge";

const fileName = 'big_fridge.gltf';

class FridgeFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createBigFridge$ = this.createBigFridge$.bind(this);
    this.createFridges$ = this.createFridges$.bind(this);
  }

  createBigFridge$(config) {
    return this.loaderService.loadGLTF$(fileName).pipe(
      map(getMeshOrGroup),
      tap(console.log),
      map(group => {
          group.castShadow = true;
          group.name = 'Big Fridge';
        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new BigFridge(obj))
    );
  }

  createFridges$(configs) {
    return from(configs).pipe(map(this.createBigFridge$));
  }
}

export { FridgeFactory };
