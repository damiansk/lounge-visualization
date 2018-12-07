import * as THREE from 'three';
import { Room } from './primitives';
import { ControlsService } from './services/CameraControlsService';
import { InteractionService } from './services/InteractionService';

class SceneManager {
    constructor(canvas) {
        this.canvas = canvas;
        this.clock = new THREE.Clock();
        this.screenDimensions = {
            width: canvas.width, 
            height: canvas.height
        };
        this.scene = buildScene();
        this.renderer = buildRender(canvas);
        this.camera = this.buildCamera(this.screenDimensions);
        this.sceneSubjects = createSceneSubjects(this.scene);
        
        InteractionService.init(this.camera, this.renderer);
    }
    
    update = () => {
        const elapsedTime = this.clock.getElapsedTime();

        for(let i=0; i < this.sceneSubjects.length; i++) {
            this.sceneSubjects[i].update(elapsedTime);
        }

        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize = () => {
        const { width, height } = this.renderer.domElement;

        this.screenDimensions.width = width;
        this.screenDimensions.height = height;

        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
    }

    buildCamera = ({ width, height }) => {
        const fieldOfView = 60;
        const aspectRatio = width / height;
        const nearPlane = 0.1;
        const farPlane = 4000; 
        const camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        
        camera.position.set(-10, 10, 10);

        camera.lookAt(0, 0, 0);
    
        ControlsService.init(camera, this.renderer.domElement);
    
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