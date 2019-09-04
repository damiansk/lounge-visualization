import { Subject } from 'rxjs';
import { getModelIndex } from './utils';

class ModelsStore {
  constructor(models = []) {
    this.models = models;
    this.updateModelsSubject$ = new Subject(this.models);
    this.addModelsSubject$ = new Subject();
    this.removeModelsSubject$ = new Subject();

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.changeName = this.changeName.bind(this);
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
      const existedModelIndex = getModelIndex(acc, model.getType());

      if (acc.length > 0 && existedModelIndex !== undefined) {
        acc[existedModelIndex].configs.push(model.getConfig());
      } else {
        acc.push({
          type: model.getType(),
          configs: [model.getConfig()],
        });
      }

      return acc;
    }, []);

    return { models: modelGroups };
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

  changeName(model, newName) {
    const found = this.models.indexOf(model);
    const matchModel = this.models[found];

    if (found !== -1 && matchModel) {
      matchModel.mesh.name = newName;

      this.updateModelsSubject$.next(this.models);
    }
  }
}

export { ModelsStore };
