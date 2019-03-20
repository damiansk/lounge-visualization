import React, { Component, createRef } from 'react';

import { createCanvas, initStatsPanel } from './utils';
import SceneManager from '../../three/SceneManager';

class ThreeContainer extends Component {
  constructor(props) {
    super(props);

    this.containerRef = createRef();
    this.barSpacerHeight = '64px';

    this.onCanvasResize = this.onCanvasResize.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
  }

  componentDidMount() {
    this.canvas = createCanvas(this.containerRef.current);
    this.sceneManager = new SceneManager(this.canvas, this.props.store);
    this.sceneManager.init();
    this.sceneManager.loadSceneModels(this.props.modelsConfig);
    this.stats = initStatsPanel(this.canvas);

    window.addEventListener('resize', this.onCanvasResize);

    this.renderFrame();
    this.onCanvasResize();
  }

  componentDidUpdate() {
    this.sceneManager.destroySceneModels();
    this.sceneManager.loadSceneModels(this.props.modelsConfig);
  }

  onCanvasResize() {
    this.canvas.style.width = '100%';
    this.canvas.style.height = '100%';

    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;

    this.sceneManager.onWindowResize();
  }

  renderFrame() {
    this.stats.begin();
    this.sceneManager.update();
    this.stats.end();
    window.requestAnimationFrame(this.renderFrame);
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
