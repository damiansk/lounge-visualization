import { BaseModel } from './BaseModel';

const type = 'Chair';

class Chair extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: true,
      name: 'Chair',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { Chair };
