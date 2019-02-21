import { Subject } from 'rxjs';

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
    // console.log(this.models)
    const modelGroups = this.models.reduce((acc, model) => {
      if (!acc[model.name]) {
        acc[model.name] = [];
      }

      acc[model.name].push(model);
      return acc;
    }, {});
    // console.log(modelGroups)
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
