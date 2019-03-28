import {
  Clock,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  LoadingManager,
  DirectionalLight,
  PCFSoftShadowMap,
} from 'three';
import { CameraControlsService } from './services/CameraControlsService';
import { InteractionService } from './services/InteractionService';
import { ModelsFactory } from './factories/ModelsFactory';

const nearPlane = 0.1;
const farPlane = 4000;
const fieldOfView = 60;

class SceneManager {
  constructor(canvas, store) {
    this.canvas = canvas;
    this.store = store;
    this.clock = new Clock();
    this.screenDimensions = {
      width: canvas.width,
      height: canvas.height,
    };

    const manager = new LoadingManager();
    this.factory = new ModelsFactory(manager);

    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.onWindowResize = this.onWindowResize.bind(this);
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

    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;

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

    CameraControlsService.init(this.camera, this.renderer.domElement);
    this.interactionService = new InteractionService(
      this.camera,
      this.renderer
    );

    this.subscribeForStoreEvents();
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

  subscribeForStoreEvents() {
    this.store.getAddEvent$().subscribe(model => {
      this.interactionService.add(model);
      this.scene.add(model.mesh);
    });
    this.store.getRemoveEvent$().subscribe(model => {
      this.interactionService.remove(model);
      this.scene.remove(model.mesh);
    });
  }

  initSceneSubjects() {
    this.factory.createFloor$().subscribe(model => {
      model.traverse(mesh => {
        mesh.receiveShadow = true;
      });
      this.interactionService.registerInterationScope(model);
      this.scene.add(model);
    });

    const directionalLight = new DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 90, -60);
    this.scene.add(directionalLight);
  }

  loadSceneModels(config) {
    this.factory
      .createModels$(config)
      .subscribe(model => this.store.add(model));
  }

  destroySceneModels() {
    const models = this.store.getModels();
    models.forEach(element => {
      this.store.remove(element);
    });
  }
}

export default SceneManager;
