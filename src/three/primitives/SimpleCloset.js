import { BaseModel } from './BaseModel';
const type = 'Simple Closet';

class SimpleCloset extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Simple Closet',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { SimpleCloset };
