class BaseModel {
    constructor(mesh) {
      this.mesh = mesh;
      this.isInteractive = true;

      this.isEqual = this.isEqual.bind(this);
    }

    getId() {
      return this.mesh.id;
    }

    isEqual(model) {
      return model.mesh === this.mesh;
    }
}

export { BaseModel };