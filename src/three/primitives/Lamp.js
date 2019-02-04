import { BaseModel } from './BaseModel';

class Lamp extends BaseModel {
  isInteractive = false;

  constructor(args) {
    super(args);

    this.setHover = this.setHover.bind(this);
  }

  setHover() {}
};

export { Lamp };