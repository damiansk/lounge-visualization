import React, { Component } from 'react';

import { threeEntryPoint } from '../../three/threeEntryPoint';

class ThreeContainer extends Component {
  containerRef = React.createRef();

  barSpacerHeight = '64px';

  componentDidMount() {
    threeEntryPoint(this.containerRef.current);
  }

  render() {
    return (
      <div
        style={{
          height: `calc(100% - ${this.barSpacerHeight})`,
          position: 'relative',
        }}
        ref={this.containerRef}
      />
    );
  }
}

export { ThreeContainer };