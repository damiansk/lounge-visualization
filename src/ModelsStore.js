import { Subject } from 'rxjs';

class ModelsStore {
  constructor(models = []) {
    this.models = models;
    this.modelsSubject = new Subject(this.models);

    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
  }

  getModels() {
    return this.models;
  }

  modelsUpdate$() {
    return this.modelsSubject.asObservable();
  }

  add(model) {
    this.models.push(model);
    this.modelsSubject.next({
      action: 'add',
      model,
      models: this.models
    });
  }

  remove(model) {
    this.models = this.models.filter(m => !model.isEqual(m));
    this.modelsSubject.next({
      action: 'remove',
      model,
      models: this.models
    });
  }
}

export { ModelsStore };
