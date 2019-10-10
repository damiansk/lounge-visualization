import { BaseModel } from './BaseModel';
const type = 'Big Fridge';

class BigFridge extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Big Fridge',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { BigFridge };
