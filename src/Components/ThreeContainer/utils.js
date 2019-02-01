import Stats from 'stats.js';

function createCanvas(containerElement) {
  const canvas = document.createElement('canvas');
  containerElement.appendChild(canvas);
  canvas.style.position = 'absolute';

  return canvas;
}

function initStatsPanel(canvas) {
  const stats = new Stats();
  stats.showPanel(0);
  stats.dom.style.position = 'absolute';
  canvas.parentElement.appendChild(stats.dom);

  return stats;
}

export { createCanvas, initStatsPanel };