class BaseModel {
    constructor(mesh) {
      this.mesh = mesh;
      this.isInteractive = true;

      this.isEqual = this.isEqual.bind(this);
    }

    isEqual(model) {
      return model.mesh === this.mesh;
    }
}

export { BaseModel };