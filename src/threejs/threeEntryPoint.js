import { SceneManager } from './SceneManager';
import Stats from 'stats.js';


const threeEntryPoint = threeRootNode => {
    const _canvas = createCanvas(document, threeRootNode);
    const _sceneManager = new SceneManager(_canvas);
    const _stats = initStatsPanel(_canvas);
    _canvas.style.position = 'absolute';
    bindEventListeners();
    render();

    function bindEventListeners() {
        window.onresize = resizeCanvas;

        resizeCanvas();
    }

    function resizeCanvas() {
        _canvas.style.width = '100%';
        _canvas.style.height = '100%';
        
        _canvas.width = _canvas.parentElement.clientWidth;
        _canvas.height = _canvas.parentElement.clientHeight;

        _sceneManager.onWindowResize();
    }

    function render() {
        setTimeout(() => {
            window.requestAnimationFrame(render);
        }, 1000/30);

        _stats.begin();
        _sceneManager.update();  
        _stats.end();
    }
}

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