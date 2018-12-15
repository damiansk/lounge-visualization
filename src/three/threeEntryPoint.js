import Stats from 'stats.js';
import SceneManager from './SceneManager';

const threeEntryPoint = threeRootNode => {
  const canvas = createCanvas(document, threeRootNode);
  const sceneManager = new SceneManager(canvas);
  sceneManager.init();
  const stats = initStatsPanel(canvas);
  canvas.style.position = 'absolute';

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    sceneManager.onWindowResize();
  }
  function bindEventListeners() {
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
  }
  function render() {
    stats.begin();
    sceneManager.update();
    stats.end();
    window.requestAnimationFrame(render);
  }

  bindEventListeners();
  render();
};

function createCanvas(document, containerElement) {
  const canvas = document.createElement('canvas');
  containerElement.appendChild(canvas);

  return canvas;
}

function initStatsPanel(canvas) {
  const stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.position = 'absolute';
  canvas.parentElement.appendChild(stats.dom);

  return stats;
}

export { threeEntryPoint };
