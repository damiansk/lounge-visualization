import { BaseModel } from './BaseModel';

const type = Symbol('Bookcase');

class Bookcase extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;
  }
}

export { Bookcase };
