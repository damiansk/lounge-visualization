import { BaseModel } from './BaseModel';

const type = 'Table';

class Table extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: true,
      name: 'Table',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { Table };
