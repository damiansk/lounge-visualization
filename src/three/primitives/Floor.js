import { BaseModel } from './BaseModel';

const type = Symbol('Floor');

class Floor extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;
  }
}

export { Floor };
