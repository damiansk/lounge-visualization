import { BaseModel } from './BaseModel';

class Lamp extends BaseModel {
  isInteractive = true;

  type = 'lamp';

  constructor(args) {
    super(args);
    this.setHover = this.setHover.bind(this);
    this.setLight = this.setLight.bind(this);

    this.checkbox = {
      initialValue: true,
      callback: this.setLight,
    };
  }

  setHover() {}

  addLight(light) {
    this.light = light;
    this.mesh.add(this.light.mesh);
  }

  setLight(lightStatus) {
    this.light.setLight(lightStatus);
  }
}

export { Lamp };
