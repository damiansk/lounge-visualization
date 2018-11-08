import { SceneManager } from './SceneManager';

const threeEntryPoint = threeRootNode => {
    const _canvas = createCanvas(document, threeRootNode);
    const _sceneManager = new SceneManager(_canvas);

    bindEventListeners();
    render();

    function bindEventListeners() {
        window.onresize = resizeCanvas;

        resizeCanvas();
    }

    function resizeCanvas() {
        _canvas.style.width = '100%';
        _canvas.style.height = '100%';

        _canvas.width = _canvas.offsetWidth;
        _canvas.height = _canvas.offsetHeight;

        _sceneManager.onWindowResize();
    }

    function render() {
        setTimeout(() => {
            window.requestAnimationFrame(render);
        }, 1000/30);

        _sceneManager.update();  
    }
}

function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);

    return canvas;
}

export { threeEntryPoint };