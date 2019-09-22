import { BaseModel } from './BaseModel';

class Bookcase extends BaseModel {
  type = 'bookcase';

  constructor(mesh) {
    super(mesh, { isInteractive: false });
  }
}

export { Bookcase };
