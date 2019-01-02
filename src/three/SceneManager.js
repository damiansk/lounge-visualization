import {
  Clock,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  LoadingManager,
  DirectionalLight,
} from 'three';
import { ControlsService } from './services/CameraControlsService';
import { InteractionService } from './services/InteractionService';
import { models as modelsConfig } from './config/models.json';
import { ModelsFactory } from './factories/ModelsFactory';

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
    this.sceneSubjects = [];

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
    this.initSceneSubjects = this.initSceneSubjects.bind(this);
  }

  init() {
    const aspectRatio = this.canvas.width / this.canvas.height;
    const DPR = window.devicePixelRatio || 1;

    this.scene = new Scene();
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });
    this.camera = new PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(-10, 10, 10);
    this.camera.lookAt(0, 0, 0);
    this.renderer.setPixelRatio(DPR);
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.scene.background = new Color('#020345');

    ControlsService.init(this.camera, this.renderer.domElement);
    this.interactionService = new InteractionService(
      this.camera,
      this.renderer
    );

    this.initSceneSubjects();
  }

  update() {
    this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {
    const { width, height } = this.renderer.domElement;

    this.screenDimensions.width = width;
    this.screenDimensions.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  initSceneSubjects() {
    const manager = new LoadingManager();
    const factory = new ModelsFactory(manager);

    factory.createFloor()
      .subscribe(model => this.scene.add(model));

    factory.createModels(modelsConfig)
      .subscribe(model => {
        console.log(model);
        // this.sceneSubjects.push(model);
        // this.scene.add(model);

        // if (model.isInteractive) {
        //   this.interactionService.registerInteractiveMesh(model);
        // } else {
        //   this.interactionService.registerStaticMesh(model);
        // }
      });

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 90, -60);
    this.scene.add(directionalLight);
  }
}

export default SceneManager;
