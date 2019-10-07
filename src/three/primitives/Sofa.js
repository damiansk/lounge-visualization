import { BaseModel } from './BaseModel';

const type = 'Sofa';

class Sofa extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      name: 'Sofa',
    });

    this.type = type;
  }
}

export { Sofa };
