import { BaseModel } from './BaseModel';

const type = 'Couch';

class Couch extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Couch',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { Couch };
