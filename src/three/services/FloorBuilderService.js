import {
  GridHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Vector2,
  Raycaster,
  FaceColors,
  Geometry,
  Vector3,
  Face3,
  MeshNormalMaterial,
  DoubleSide,
  Color,
} from 'three';
import { CameraControlsService } from './CameraControlsService';

const GRID_SIZE = 10;
const SQUARE_SIZE = 1;
const GRID_DIVISIONS = GRID_SIZE / SQUARE_SIZE;
const PRIMARY_COLOR = 0xffffff;
const SECONDARY_COLOR = 0x00ff00;
const DEFAULT_COLOR = 0xffffff;
const CLICK_COLOR = 0x00ff00;
const HOVER_COLOR = 0xffff00;
const WARNING_COLOR = 0xff0000;

function getTile([col, row], grid) {
  return row * grid[0] + col;
}
function getColumnAndRow(index, grid) {
  const col = index % grid[1];
  const row = Math.floor(index / grid[0]);
  return [col, row];
}

const setFacesColor = (faces, color) => {
  const temp = faces.forEach(face => face.color.setHex(color));

  if(color ===undefined) {
    debugger;
  }

  return temp;
};

const getSecondaryFaceIndex = faceIndex => {
  if (!(faceIndex % 2)) {
    return faceIndex + 1;
  }
  return faceIndex - 1;
};

const getIntersectedFaces = plane => {
  const secondaryFaceIndex = getSecondaryFaceIndex(plane.faceIndex);

  const primaryFace = plane.object.geometry.faces[plane.faceIndex];
  const secondaryFace = plane.object.geometry.faces[secondaryFaceIndex];

  return [primaryFace, secondaryFace];
};

const getFacesColor = faces => {
  return faces[0].color.getHex();
};

const isTheSameFace = ({ a: a1, b: b1, c: c1 }, { a: a2, b: b2, c: c2 }) =>
  a1 === a2 && b1 === b2 && c1 === c2;

class FloorBuilderService {
  constructor(canvas, scene, camera) {
    CameraControlsService.disable();
    this.scene = scene;
    this.camera = camera;
    this.canvas = canvas;

    this.mousePos = new Vector2();
    this.raycaster = new Raycaster();

    this.plane = null;
    this.drawStartFaceIndex = false;
    this.prevHoverFaces = [];

    this.buildGrid();
    this.buildPlane();
    this.initRaycaster();
    this.initListeners();
    this.initSelection();
  }

  initSelection() {
    const geometry = new Geometry();
    // create an array of vertices by way of
    // and array of vector3 instances
    geometry.vertices.push(
      new Vector3(1, 0, 1),
      new Vector3(1, 0, -1),
      new Vector3(-1, 0, -1),
      new Vector3(-1, 0, 1)
    );

    // create faces by way of an array of
    // face3 instances. (you just play connect
    // the dots with index values from the
    // vertices array)
    geometry.faces.push(
      new Face3(2, 0, 3),
      new Face3(1, 0, 2),
    );

    // compute Normals
    geometry.computeVertexNormals();

    // normalize the geometry
    geometry.normalize();
    this.selectionMesh = new Mesh(
      // geometry as first argument
      geometry,
      // then Material
      new MeshBasicMaterial({
        color: 0xffe6e6,
        side: DoubleSide
      }))

    this.selectionMesh.position.y= 5
    this.scene.add(this.selectionMesh);
  }

  updateSelectionMesh() {
    const selectionColor = new Color()
    selectionColor.setHex(CLICK_COLOR);
    const vertIndexArr = this.plane.geometry.vertices.map(v => {
      v.clone()

      v.setY(5);

      return v;
    });
    const selectedFaces = this.plane.geometry.faces.filter(face => {
      const isEq = face.color.equals(selectionColor)
      return isEq;
    });
    
    this.selectionMesh.geometry.vertices = vertIndexArr;
    this.selectionMesh.geometry.faces = selectedFaces;

    this.selectionMesh.geometry.verticesNeedUpdate  = true
    this.selectionMesh.geometry.elementsNeedUpdate = true
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

  initRaycaster() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
  }

  initListeners() {
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvas.addEventListener('mouseup', this.onMouseUp.bind(this));
    this.canvas.addEventListener('click', console.log);
  }

  getIntersectPlane() {
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    return this.raycaster.intersectObject(this.plane)[0];
  }

  detectMouseIntersectWithPlane() {
    if (this.plane) {
      const onPlane = this.raycaster.intersectObject(this.plane)[0];

      if (onPlane) {
        this.paintSquare(onPlane);
      }
    }
  }

  detectClickPaintingColor(color) {
    switch (color) {
      case DEFAULT_COLOR:
      case HOVER_COLOR:
        return CLICK_COLOR;
      case CLICK_COLOR:
      case WARNING_COLOR:
        return DEFAULT_COLOR;
      default:
          return color;
    }
  }

  detectPreviouslyHoveredPaintingColor(prevColor) {
    switch (prevColor) {
      case HOVER_COLOR:
        return DEFAULT_COLOR;
      case WARNING_COLOR:
        return CLICK_COLOR;
        // TODO fix other cases
      default:
        return prevColor;
    }
  }

  handleHoverPainting(hoveredFaces) {
    if (this.prevHoverFaces.length &&
      !(
        isTheSameFace(hoveredFaces[0], this.prevHoverFaces[0]) ||
        isTheSameFace(hoveredFaces[0], this.prevHoverFaces[1])
      )
    ) {
      const color = getFacesColor(hoveredFaces);

      setFacesColor(hoveredFaces, this.detectHoverPaintingColor(color));

      const prevColor = getFacesColor(this.prevHoverFaces);
      
      setFacesColor(this.prevHoverFaces, this.detectPreviouslyHoveredPaintingColor(prevColor));
    }
  }

  detectHoverPaintingColor(color) {
    switch (color) {
      case DEFAULT_COLOR:
        return HOVER_COLOR;
      case CLICK_COLOR:
        return WARNING_COLOR;
      default:
          return color;
    }
  }

  handleDragPainting(plane) {
    if (typeof this.drawStartFaceIndex === 'number') {
      this.drawEndFaceIndex = plane.faceIndex;

      plane.object.geometry.copy(this.geometryCache);

      const facesInRow = GRID_SIZE * 2;
      const GRID = [facesInRow, facesInRow];
      
      const drawStart = this.drawStartFaceIndex;
      const drawEnd = this.drawEndFaceIndex;

      const [x1, y1] = getColumnAndRow(drawStart, GRID);
      const [x2, y2] = getColumnAndRow(drawEnd, GRID);

      const minX = Math.min(x1, x2);
      const maxX = Math.max(x1, x2);
      const minY = Math.min(y1, y2);
      const maxY = Math.max(y1, y2);

      const firstFaceColor = getFacesColor([plane.object.geometry.faces[this.drawStartFaceIndex]]);
      const targetColor = this.detectDragPaintingColor(firstFaceColor);

      for (let j = minY; j <= maxY; j++) {
        for (let i = minX; i <= maxX; i++) {
          const tileFaceIndex = getTile([i, j], GRID);
          plane.object.geometry.faces[tileFaceIndex].color.setHex(targetColor);
          const secondFace = getSecondaryFaceIndex(tileFaceIndex);
          plane.object.geometry.faces[secondFace].color.setHex(targetColor);
        }
      }

      plane.object.geometry.elementsNeedUpdate = true;
    }
  }

  detectDragPaintingColor(color) {
    return this.detectClickPaintingColor(color);
  }

  onMouseDown() {
    const plane = this.getIntersectPlane();
    this.drawingStarted = true;

    if (plane) {
      const clickedFaces = getIntersectedFaces(plane);
      this.drawStartFaceIndex = plane.faceIndex;
      this.geometryCache = plane.object.geometry.clone();

      const color = getFacesColor(clickedFaces);

      // TODO Use this in mouseMove
      const targetColor = this.detectClickPaintingColor(color);

      setFacesColor(clickedFaces, targetColor);

      plane.object.geometry.colorsNeedUpdate = true;
    }
  }

  onMouseUp() {
    this.drawStartFaceIndex = null;
    this.drawEndFaceIndex = null;
    this.geometryCache = null;
    this.drawingStarted = false;

    this.updateSelectionMesh();
  }

  onMouseMove({ clientX, clientY, target }) {
    const { left: x, top: y } = target.getBoundingClientRect();

    this.mousePos.set(
      ((clientX - x) / this.canvas.clientWidth) * 2 - 1,
      (-(clientY - y) / this.canvas.clientHeight) * 2 + 1
    );

    const plane = this.getIntersectPlane();

    if (plane) {

      if (this.drawingStarted) {
        this.handleDragPainting(plane);
      }
      else {
        const hoveredFaces = getIntersectedFaces(plane);

        this.handleHoverPainting(hoveredFaces);
        
        this.prevHoverFaces = hoveredFaces;
      }

      plane.object.geometry.colorsNeedUpdate = true;
    }
  }
}

export { FloorBuilderService };
