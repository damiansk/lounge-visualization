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
  FaceColors,
} from 'three';
import { CameraControlsService } from './CameraControlsService';

const GRID_SIZE = 10;
const SQUARE_SIZE = 1;
const GRID_DIVISIONS = GRID_SIZE / SQUARE_SIZE;
const PRIMARY_COLOR = 0xffffff;
const SECONDARY_COLOR = 0x00ff00;

class FloorBuilderService {
  constructor(canvas, scene, camera) {
    CameraControlsService.disable();
    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;

    this.mousePos = new Vector2();
    this.raycaster = new Raycaster();

    this.plane = null;

    this.drawStart = false;

    this.buildGrid();
    this.buildPlane();
    this.initRaycaster();

    canvas.addEventListener(
      'mousemove',
      this.getClientMousePosition.bind(this)
    );

    canvas.addEventListener(
      'mousedown',
      this.onMouseClick.bind(this)
    );

    canvas.addEventListener(
      'mouseup',
      this.onMouseRelease.bind(this)
    );
  }

  onMouseClick() {
    this.drawStart = true;

    this.initRaycaster();
    this.detectMouseIntersectWithPlane();
  }

  onMouseRelease() {
    this.drawStart = false;
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
      vertexColors: FaceColors,
    });
    const plane = new Mesh(planeGeom, planeMat);

    this.plane = plane;
    this.scene.add(plane);
  }

  // TODO: Create separate global method for receiving mouse position
  getClientMousePosition({ clientX, clientY, target }) {
    const { left: x, top: y } = target.getBoundingClientRect();

    this.mousePos.set(
      (clientX - x)/this.canvas.clientWidth * 2 - 1,
      - (clientY - y)/this.canvas.clientHeight * 2 + 1
    );

    if(this.drawStart) {
      this.initRaycaster();
      this.detectMouseIntersectWithPlane();
    }
  }

  initRaycaster() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
  }

  findSecondaryFace(faceIndex) {
    if (!(faceIndex % 2)) {
      return faceIndex + 1;
    }
    else {
      return faceIndex -1;
    }
  }

  paintSquare(planeIntersect) {
    const secondaryFace = this.findSecondaryFace(planeIntersect.faceIndex);
    const secondFaceToPaint = planeIntersect.object.geometry.faces[secondaryFace];
    
    planeIntersect.object.geometry.colorsNeedUpdate = true;
      
    planeIntersect.face.color.setHex(SECONDARY_COLOR);
    secondFaceToPaint.color.setHex(SECONDARY_COLOR);
  }

  detectMouseIntersectWithPlane() {
    if (this.plane) {
      const onPlane = this.raycaster.intersectObject(this.plane)[0];

      if (onPlane) {
        this.paintSquare(onPlane);
      }
    }
  }
}

export { FloorBuilderService };
