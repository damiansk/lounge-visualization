import { BaseModel } from './BaseModel';

const type = Symbol('Chair');

const defaultAttributes = {
  isHovered: false,
  isInteractive: true,
};

class Chair extends BaseModel {
  constructor(mesh) {
    super(mesh, defaultAttributes);

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { Chair };
