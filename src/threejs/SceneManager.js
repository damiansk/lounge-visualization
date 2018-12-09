import {
  Clock, Scene, WebGLRenderer, PerspectiveCamera, Color,
} from 'three';
import {
  Room,
} from './primitives';
import {
  ControlsService,
} from './services/CameraControlsService';
import {
  InteractionService,
} from './services/InteractionService';

const nearPlane = 0.1;
const farPlane = 4000;
const fieldOfView = 60;

class SceneManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.clock = new Clock();
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    };
  }

  init = () => {
    const aspectRatio = this.canvas.width / this.canvas.height;
    const DPR = window.devicePixelRatio || 1;

    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
    this.camera.position.set(-10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    this.sceneSubjects = new Room(this.scene);
    this.renderer.setPixelRatio(DPR);
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.scene.background = new Color('#020345');

    ControlsService.init(this.camera, this.renderer.domElement);
    InteractionService.init(this.camera, this.renderer);
  }

  update = () => {
    const elapsedTime = this.clock.getElapsedTime();

    for (let i = 0; i < this.sceneSubjects.length; i++) {
      this.sceneSubjects[i].update(elapsedTime);
    }

    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize = () => {
    const {
      width,
      height,
    } = this.renderer.domElement;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}

export default SceneManager;
