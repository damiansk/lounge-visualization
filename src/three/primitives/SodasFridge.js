import { BaseModel } from './BaseModel';

const type = 'Big Fridge';

class SodasFridge extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Sodas Fridge',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { SodasFridge };
