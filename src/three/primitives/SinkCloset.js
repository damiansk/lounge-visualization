import { BaseModel } from './BaseModel';

const type = 'Closet With Sink';

class SinkCloset extends BaseModel {
  constructor(mesh) {
    super(mesh, {
      isHovered: false,
      isInteractive: false,
      name: 'Closet With Sink',
    });

    this.type = type;

    this.handleAttributesChange({
      isHovered: this.handleHover,
    });
  }
}

export { SinkCloset };
