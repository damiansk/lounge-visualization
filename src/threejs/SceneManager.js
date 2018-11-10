import * as THREE from 'three';
import { Cube } from './primitives';
import OrbitControls from 'orbit-controls-es6';

class SceneManager {
    constructor(canvas) {
        this._canvas = canvas;
        this._clock = new THREE.Clock();
        this._screenDimensions = {
            width: canvas.width, 
            height: canvas.height
        };
        this._scene = buildScene();
        this._renderer = buildRender(canvas);
        this._camera = this.buildCamera(this._screenDimensions);
        this._sceneSubjects = createSceneSubjects(this._scene);
    }
    
    update = () => {
        const elapsedTime = this._clock.getElapsedTime();

        for(let i=0; i < this._sceneSubjects.length; i++) {
            this._sceneSubjects[i].update(elapsedTime);
        }

        this._renderer.render(this._scene, this._camera);
    }

    onWindowResize = () => {
        const { width, height } = this._canvas;

        this._screenDimensions.width = width;
        this._screenDimensions.height = height;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();
        
        this._renderer.setSize(width, height);
    }

    buildCamera = ({ width, height }) => {
        const fieldOfView = 60;
        const aspectRatio = width / height;
        const nearPlane = 0.1;
        const farPlane = 4000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        
        camera.position.set(1, 2, 2);
    
        camera.rotateY((30 * Math.PI)/180);
        camera.rotateX((-45 * Math.PI)/180);
    
        const controls = new OrbitControls(camera, this._renderer.domElement);
        controls.enabled = true;
    
        return camera;
    }
}

function buildScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#020345');

    return scene;
}

function buildRender(canvas) {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const DPR = window.devicePixelRatio || 1;

    renderer.setPixelRatio(DPR);
    renderer.setSize(canvas.width, canvas.height);

    return renderer;
}

function createSceneSubjects(scene) {
    const sceneSubjects = [
        new Cube(scene),
    ];

    return sceneSubjects;
}

export { SceneManager };