import { BaseModel } from './BaseModel';

class Lamp extends BaseModel {
  constructor(args) {
    super(args);

    this.setHover = this.setHover.bind(this);
  }

  setHover() {}
};

export { Lamp };