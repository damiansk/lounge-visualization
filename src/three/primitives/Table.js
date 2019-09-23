import { BaseModel } from './BaseModel';

const type = Symbol('Table');

const defaultAttributes = {
  isHovered: false,
  isInteractive: true,
};

class Table extends BaseModel {
  constructor(mesh) {
    super(mesh, defaultAttributes);

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { Table };
