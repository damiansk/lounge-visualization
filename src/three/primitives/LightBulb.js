import { BaseModel } from './BaseModel';

class LightBulb extends BaseModel {
  isInteractive = false;

  constructor(mesh) {
    super(mesh, { isInteractive: false });

    this.setLight = this.setLight.bind(this);
  }

  handleHover() {}

  setLight(lightStatus) {
    this.mesh.intensity = Number(lightStatus);
  }
}

export { LightBulb };
