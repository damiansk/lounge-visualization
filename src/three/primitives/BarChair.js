import { BaseModel } from './BaseModel';

const type = Symbol('Bar chair');

const defaultAttributes = {
  isHovered: false,
  isInteractive: true,
};

class BarChair extends BaseModel {
  constructor(mesh) {
    super(mesh, defaultAttributes);

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { BarChair };
