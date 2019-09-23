import { BaseModel } from './BaseModel';

const type = Symbol('Light bulb');

class LightBulb extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;

    this.setLight = this.setLight.bind(this);
  }

  setLight(lightStatus) {
    this.mesh.intensity = Number(lightStatus);
  }
}

export { LightBulb };
