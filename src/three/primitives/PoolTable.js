import { BaseModel } from './BaseModel';

class PoolTable extends BaseModel {
  type = 'pool_table';

  constructor(mesh) {
    super(mesh, { isInteractive: false });
  }
}

export { PoolTable };
