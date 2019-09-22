import { BaseModel } from './BaseModel';

class Floor extends BaseModel {
  constructor(mesh) {
    super(mesh, { isInteractive: false });
  }
}

export { Floor };
