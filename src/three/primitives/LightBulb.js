import { BaseModel } from './BaseModel';

class LightBulb extends BaseModel {
  isInteractive = false;

  constructor(props) {
    super(props);

    this.setLight = this.setLight.bind(this);
  }

  setLight(lightStatus) {
    this.mesh.children.forEach(child => {
      child.visible = lightStatus;
    });
    this.mesh.intensity = Number(lightStatus);
  }
}

export { LightBulb };
