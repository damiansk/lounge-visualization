import React, { createRef, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { createCanvas, initStatsPanel } from './utils';
import SceneManager from '../../three/SceneManager';
import { store } from '../../storeContext';

class ThreeContainer extends PureComponent {
  constructor(props) {
    super(props);

    this.containerRef = createRef();
    this.barSpacerHeight = '64px';

    this.onCanvasResize = this.onCanvasResize.bind(this);
    this.renderFrame = this.renderFrame.bind(this);
  }

  componentDidMount() {
    this.canvas = createCanvas(this.containerRef.current);
    this.sceneManager = new SceneManager(this.canvas, store);
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

  renderFrame(time) {
    this.stats.begin();
    this.sceneManager.update(time);
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

ThreeContainer.propTypes = {
  modelsConfig: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      configs: PropTypes.arrayOf(
        PropTypes.shape({
          position: PropTypes.shape({
            x: PropTypes.number,
            z: PropTypes.number,
          }),
          rotation: PropTypes.number,
        })
      ),
    })
  ),
};

export { ThreeContainer };
