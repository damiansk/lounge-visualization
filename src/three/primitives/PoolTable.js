import { BaseModel } from './BaseModel';

const type = 'Pool table';

class PoolTable extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      name: 'Pool table',
    });

    this.type = type;
  }
}

export { PoolTable };
