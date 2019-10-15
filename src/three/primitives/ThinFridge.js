import { BaseModel } from './BaseModel';

const type = 'Thin Fridge';

class ThinFridge extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Thin Fridge',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { ThinFridge };
