import {
  GridHelper,
  PlaneGeometry,
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

const DEFAULT_COLOR = 0xffffff;
const HOVER_COLOR = 0x00ff00;
const CLICK_COLOR = 0xffff00;

const setFacesColor = (faces, color) => {
  faces.forEach(face => face.color.setHex(color));
}

const findSecondaryFace = faceIndex => {
  if (!(faceIndex % 2)) {
    return faceIndex + 1;
  }
  return faceIndex -1;
}

const getIntersectedFaces = plane => {
  const secondaryFaceIndex = findSecondaryFace(plane.faceIndex);

  const primaryFace = plane.object.geometry.faces[plane.faceIndex];
  const secondaryFace = plane.object.geometry.faces[secondaryFaceIndex];

  return [primaryFace, secondaryFace];
}

const getFacesColor = faces => {
  return faces[0].color.getHex();
}

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
    this.prevHoverFaces = [];

    this.buildGrid();
    this.buildPlane();
    this.initRaycaster();
    this.initListeners();
  }

  initListeners() {
    this.canvas.addEventListener(
      'mousemove',
      this.onMouseMove.bind(this)
    );

    this.canvas.addEventListener(
      'mousedown',
      this.onMouseDown.bind(this)
    );

    this.canvas.addEventListener(
      'mouseup',
      this.onMouseUp.bind(this)
    );

    this.canvas.addEventListener(
      'mouseup',
      this.onMouseUp.bind(this)
    );
  }

  onMouseDown() {
    const plane = this.getIntersectPlane();

    if(plane) {
      const clickedFaces = getIntersectedFaces(plane);

      const color = getFacesColor(clickedFaces);

      // TODO Use this in mouseMove
      let targetColor = color;

      switch(color) {
        case DEFAULT_COLOR: 
        case HOVER_COLOR: 
          targetColor = CLICK_COLOR;
          break;
        case CLICK_COLOR:
          targetColor = DEFAULT_COLOR
          break;
      }

      setFacesColor(clickedFaces, targetColor);

      plane.object.geometry.colorsNeedUpdate = true;
    }
  }

  onMouseUp() {
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

  onMouseMove({ clientX, clientY, target }) {
    const { left: x, top: y } = target.getBoundingClientRect();
    

    this.mousePos.set(
      (clientX - x)/this.canvas.clientWidth * 2 - 1,
      - (clientY - y)/this.canvas.clientHeight * 2 + 1
    );

    const plane = this.getIntersectPlane();

    if(plane) {
      const hoveredFaces = getIntersectedFaces(plane);

      setFacesColor(this.prevHoverFaces, DEFAULT_COLOR);
      setFacesColor(hoveredFaces, HOVER_COLOR);

      this.prevHoverFaces = hoveredFaces;
      plane.object.geometry.colorsNeedUpdate = true;
    }
  }

  getIntersectPlane() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    return this.raycaster.intersectObject(this.plane)[0];
  }

  initRaycaster() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
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
