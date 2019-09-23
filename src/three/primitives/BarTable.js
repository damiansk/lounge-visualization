import { BaseModel } from './BaseModel';

const type = Symbol('Bar table');

const defaultAttributes = {
  isHovered: false,
  isInteractive: true,
};

class BarTable extends BaseModel {
  constructor(mesh) {
    super(mesh, defaultAttributes);

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { BarTable };
