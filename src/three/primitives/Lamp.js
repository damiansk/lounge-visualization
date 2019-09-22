import { BaseModel } from './BaseModel';

class Lamp extends BaseModel {
  type = 'lamp';

  constructor(mesh) {
    super(mesh, { isInteractive: false });
    this.handleHover = this.handleHover.bind(this);
    this.setLight = this.setLight.bind(this);

    this.checkbox = {
      initialValue: true,
      callback: this.setLight,
    };
  }

  handleHover() {}

  addLight(light) {
    this.light = light;
    this.mesh.add(this.light.mesh);
  }

  setLight(lightStatus) {
    this.light.setLight(lightStatus);
  }
}

export { Lamp };
