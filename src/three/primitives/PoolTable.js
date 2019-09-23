import { BaseModel } from './BaseModel';

const type = Symbol('Pool table');

class PoolTable extends BaseModel {
  constructor(mesh) {
    super(mesh);

    this.type = type;
  }
}

export { PoolTable };
