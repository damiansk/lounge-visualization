import {
  GridHelper,
  Color,
  Plane,
  PlaneGeometry,
  Material,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Raycaster,
} from 'three';
import { CameraControlsService } from './CameraControlsService';

const GRID_SIZE = 10;
const SQUARE_SIZE = 1;
const GRID_DIVISIONS = GRID_SIZE / SQUARE_SIZE;
const PRIMARY_COLOR = 0xffffff;

class FloorBuilderService {
  constructor(canvas, scene, camera) {
    CameraControlsService.disable();
    this.scene = scene;
    this.camera = camera;

    this.mousePos = new Vector2();
    this.raycaster = new Raycaster();

    this.buildGrid();
    this.buildPlane();
    this.initRaycaster();

    canvas.addEventListener(
      'mousemove',
      this.getClientMousePosition.bind(this)
    );
  }

  buildGrid() {
    const grid = new GridHelper(GRID_SIZE, GRID_DIVISIONS, PRIMARY_COLOR);

    this.scene.add(grid);
  }

  buildPlane() {
    const planeGeom = new PlaneGeometry(
      GRID_SIZE,
      GRID_SIZE,
      GRID_DIVISIONS,
      GRID_DIVISIONS
    );

    planeGeom.rotateX(-Math.PI / 2);

    const planeMat = new MeshBasicMaterial({
      color: 0xe6e6e6,
      transparent: true,
      opacity: 0.3,
    });
    const plane = new Mesh(planeGeom, planeMat);

    this.scene.add(plane);
  }

  // TODO: Create separate global method for receiving mouse position
  getClientMousePosition({ clientX, clientY, target }) {
    const { left: x, top: y } = target.getBoundingClientRect();

    this.mousePos.set(clientX - x, clientY - y);
  }

  initRaycaster() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
  }

  detectMouseIntersectWithPlane() {}
}

export { FloorBuilderService };
