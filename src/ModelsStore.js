import { Subject } from 'rxjs';
import { Math as TMath } from 'three';

class ModelsStore {
  constructor(models = []) {
    this.models = models;
    this.updateModelsSubject$ = new Subject(this.models);
    this.addModelsSubject$ = new Subject();
    this.removeModelsSubject$ = new Subject();

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.getUpdateEvent$ = this.getUpdateEvent$.bind(this);
    this.getAddEvent$ = this.getAddEvent$.bind(this);
    this.getRemoveEvent$ = this.getRemoveEvent$.bind(this);
  }

  getUpdateEvent$() {
    return this.updateModelsSubject$.asObservable();
  }

  getAddEvent$() {
    return this.addModelsSubject$.asObservable();
  }

  getRemoveEvent$() {
    return this.removeModelsSubject$.asObservable();
  }

  createJson() {
    const modelGroups = this.models.reduce((acc, model) => {
      if (acc.length > 0 && model.mesh.name === acc[acc.length - 1].type) {
        acc[acc.length - 1].configs.push({
          position: {
            x: model.mesh.position.x,
            z: model.mesh.position.z
          },
          rotation: model.mesh.rotation._y * TMath.RAD2DEG
        })
      } else {
        acc.push({
          type: model.mesh.name,
          configs: [{
            position: {
              x: model.mesh.position.x,
              z: model.mesh.position.z
            },
            rotation: model.mesh.rotation._y * TMath.RAD2DEG
          }]
        });
      }

      return acc;
    }, []);
    console.log(modelGroups, this.models)
  }

  getModels() {
    return this.models;
  }

  add(model) {
    this.models.push(model);
    this.updateModelsSubject$.next(this.models);
    this.addModelsSubject$.next(model);
  }

  remove(model) {
    this.models = this.models.filter(m => !model.isEqual(m));
    this.updateModelsSubject$.next(this.models);
    this.removeModelsSubject$.next(model);
  }
}

export { ModelsStore };
