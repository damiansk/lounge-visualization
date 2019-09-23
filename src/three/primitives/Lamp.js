import { BaseModel } from './BaseModel';

const type = Symbol('Lamp');

class Lamp extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;

    this.setLight = this.setLight.bind(this);
    // TODO Handle this via reactive attribute `light`
    this.checkbox = {
      initialValue: true,
      callback: this.setLight,
    };
  }

  addLight(light) {
    this.light = light;
    this.mesh.add(this.light.mesh);
  }

  setLight(lightStatus) {
    this.light.setLight(lightStatus);
  }
}

export { Lamp };
