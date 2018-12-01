import React, { Component } from 'react';

import { threeEntryPoint } from '../../threejs/threeEntryPoint';


export class ThreeContainer extends Component {

    _containerRef = React.createRef();
    _barSpacerHeight = '64px';

    componentDidMount() {  
        threeEntryPoint(this._containerRef.current);
    }

    render() {
        return <div style={{ height: `calc(100% - ${this._barSpacerHeight})`, position: 'relative' }} ref={this._containerRef}/>;
    }
}