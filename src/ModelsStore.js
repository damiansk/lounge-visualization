class ModelsStore {
    constructor() {
        this.models = [];

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
    }

    add(model) {
        this.models.push(model);
    }

    remove(model) {
        this.models = this.models.filter(m => !m.isEqual(model));
    }
}

export { ModelsStore };