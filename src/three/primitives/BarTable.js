import { BaseModel } from './BaseModel';

const type = 'Bar table';

class BarTable extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: true,
      name: 'Bar table',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { BarTable };
