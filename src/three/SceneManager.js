import {
  Clock,
  Scene,
  WebGLRenderer,
  PerspectiveCamera,
  Color,
  LoadingManager,
  DirectionalLight,
  PCFSoftShadowMap,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader,
  FrontSide,
} from 'three';
import { CameraControlsService } from './services/CameraControlsService';
import { InteractionService } from './services/InteractionService';
import { AnimationService } from './services/AnimationService';
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
    this.scene.background = new Color('#010113');

    CameraControlsService.init(this.camera, this.renderer.domElement);
    this.animationService = new AnimationService();
    this.interactionService = new InteractionService(
      this.camera,
      this.renderer,
      this.animationService
    );
    this.subscribeForStoreEvents();
    this.initSceneSubjects();
  }

  update(time) {
    CameraControlsService.update();
    this.animationService.update(time);
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
    this.factory.createFloor$().subscribe(mesh => {
      const meshes = mesh.scene.children;

      meshes.forEach(mesh => {
        mesh.receiveShadow = true;
        this.interactionService.registerInterationScope(mesh);
        this.scene.add(mesh);
      });
    });

    const textureLoader = new TextureLoader();
    textureLoader.load('assets/panorama.jpg', texture => {
      const geometry = new SphereGeometry(31, 36, 20);
      const material = new MeshBasicMaterial({
        map: texture,
        side: FrontSide,
      });
      geometry.scale(-1, 1, 1);
      const mesh = new Mesh(geometry, material);
      this.scene.add(mesh);
      mesh.position.set(0, 0, 0);
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
