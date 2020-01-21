import { BaseModel } from './BaseModel';

const type = 'Dishwasher Closet';

class DishwasherCloset extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Dishwasher Closet',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { DishwasherCloset };
