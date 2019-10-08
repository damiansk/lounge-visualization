import { BaseModel } from './BaseModel';

const type = 'Bar chair';

class BarChair extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: true,
      name: 'Bar chair',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { BarChair };
