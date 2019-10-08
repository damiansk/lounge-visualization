import { BaseModel } from './BaseModel';

const type = 'Floor';

class Floor extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      name: 'Floor',
    });

    this.type = type;
  }
}

export { Floor };
