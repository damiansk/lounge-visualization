import { BaseModel } from './BaseModel';

const type = Symbol('Sofa');

class Sofa extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;
  }
}

export { Sofa };
