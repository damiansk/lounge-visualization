import { BehaviorSubject } from 'rxjs';

class ModelsStore {
  constructor(models = []) {
    this.models = models;
    this.modelsSubject = new BehaviorSubject(this.models);

    this.remove = this.remove.bind(this);
    this.add = this.add.bind(this);
  }

  getModels$() {
    return this.modelsSubject.asObservable();
  }

  getModels() {
    return this.models;
  }

  add(model) {
    this.models.push(model);
    this.modelsSubject.next(this.models);
  }

  remove(model) {
    this.models = this.models.filter(m => !model.isEqual(m));
    this.modelsSubject.next(this.models);
  }
}

export { ModelsStore };
