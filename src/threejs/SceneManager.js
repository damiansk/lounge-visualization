import * as THREE from 'three';
import { Room } from './primitives';
import { ControlsService } from './services/CameraControlsService';
import { InteractionService } from './services/InteractionService';

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
        
        InteractionService.init(this._camera, this._renderer);
    }
    
    update = () => {
        const elapsedTime = this._clock.getElapsedTime();

        for(let i=0; i < this._sceneSubjects.length; i++) {
            this._sceneSubjects[i].update(elapsedTime);
        }

        this._renderer.render(this._scene, this._camera);
    }

    onWindowResize = () => {
        const { width, height } = this._renderer.domElement;

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
        
        camera.position.set(-10, 10, 10);

        camera.lookAt(0, 0, 0);
    
        ControlsService.init(camera, this._renderer.domElement);
    
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
        new Room(scene),
    ];

    return sceneSubjects;
}

export { SceneManager };