import { BaseModel } from './BaseModel';

class LightBulb extends BaseModel {
  isInteractive = false;

  constructor(props) {
    super(props);

    this.setLight = this.setLight.bind(this);
  }

  setLight(lightStatus) {
    this.mesh.intensity = Number(lightStatus);
  }
}

export { LightBulb };
