import { BaseModel } from './BaseModel';

const type = 'Bookcase';

class Bookcase extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      name: 'Bookcase',
    });

    this.type = type;
  }
}

export { Bookcase };
