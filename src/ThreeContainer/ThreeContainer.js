import React, { Component } from 'react';

import { threeEntryPoint } from '../threejs/threeEntryPoint';


export class ThreeContainer extends Component {

    _containerRef = React.createRef();

    componentDidMount() {  
        threeEntryPoint(this._containerRef.current);
    }

    render() {
        return <div ref={this._containerRef}/>;
    }
}