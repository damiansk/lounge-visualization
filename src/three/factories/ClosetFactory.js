import { from, of } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { applyConfig, getMeshOrGroup } from './utils';
import { LoaderService } from '../services/ObjectLoaderService';
import { SimpleCloset } from '../primitives/SimpleCloset';
import { SinkCloset } from '../primitives/SinkCloset';
import { DishwasherCloset } from '../primitives/DishwasherCloset';

const simpleClosetFileName = 'closet_simple.gltf';
const closetWithSinkFileName = 'closet_sink.gltf';
const closetDishwasherFileName = 'closet_dishwasher.gltf';

class ClosetFactory {
  constructor(loadingManager) {
    this.loadingManager = loadingManager;
    this.loaderService = new LoaderService(this.loadingManager);

    this.createSimpleClosets$ = this.createSimpleClosets$.bind(this);
    this.createClosetsWithSink$ = this.createClosetsWithSink$.bind(this);
    this.createClosetsWithDishwasher$ = this.createClosetsWithDishwasher$.bind(
      this
    );
    this.createSimpleCloset$ = this.createSimpleCloset$.bind(this);
    this.createClosetWithSink$ = this.createClosetWithSink$.bind(this);
    this.createClosetWithDishwasher$ = this.createClosetWithDishwasher$.bind(
      this
    );
  }

  createSimpleCloset$(config) {
    return this.loaderService.loadGLTF$(simpleClosetFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
        group.castShadow = true;
        group.name = 'Simple Closet';

        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new SimpleCloset(obj))
    );
  }

  createClosetWithSink$(config) {
    return this.loaderService.loadGLTF$(closetWithSinkFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
        group.castShadow = true;
        group.name = 'Closet with sink';

        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new SinkCloset(obj))
    );
  }

  createClosetWithDishwasher$(config) {
    return this.loaderService.loadGLTF$(closetDishwasherFileName).pipe(
      map(getMeshOrGroup),
      map(group => {
        group.castShadow = true;
        group.name = 'Closet With Dishwasher';

        return group;
      }),
      shareReplay(1),
      map(applyConfig(config)),
      map(obj => new DishwasherCloset(obj))
    );
  }

  createSimpleClosets$(configs) {
    return from(configs).pipe(map(this.createSimpleCloset$));
  }

  createClosetsWithSink$(configs) {
    return from(configs).pipe(map(this.createClosetWithSink$));
  }

  createClosetsWithDishwasher$(configs) {
    return from(configs).pipe(map(this.createClosetWithDishwasher$));
  }
}

export { ClosetFactory };
