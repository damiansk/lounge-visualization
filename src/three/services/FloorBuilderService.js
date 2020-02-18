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
  Line3,
  BoxGeometry,
  Shape,
  ExtrudeGeometry,
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

const createWallElement = (verts) => {
  const faces = [new Face3(0, 1, 2), new Face3(2, 3, 0)];
  const geometry = new Geometry();
  geometry.vertices.push(...verts);
  geometry.faces.push(...faces);
  geometry.elementsNeedUpdate = true;
  geometry.verticesNeedUpdate = true;

  const material = new MeshBasicMaterial({
    color: 0x006600,
    side: DoubleSide,
  });

  return new Mesh(geometry, material);
}

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

  if (color === undefined) {
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

const findOutlineVertices = (vertices, faces) => {
  const outlineVertices = vertices.filter((vertex, index) => {
    const selectedFaces = faces.filter(
      face => face.a === index || face.b === index || face.c === index
    );
    return selectedFaces.length < 6;
  });
  return outlineVertices;
};

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

    this.buildWalls = this.buildWalls.bind(this);

    document.addEventListener('keydown', event => {
      if(event.code === "KeyB") {
        this.buildWalls();
      }
    })
  }

  initSelection() {
    const geometry = new Geometry();

    geometry.vertices.push(
      new Vector3(1, 0, 1),
      new Vector3(1, 0, -1),
      new Vector3(-1, 0, -1),
      new Vector3(-1, 0, 1)
    );

    geometry.faces.push(new Face3(2, 0, 3), new Face3(1, 0, 2));

    geometry.computeVertexNormals();

    geometry.normalize();
    this.selectionMesh = new Mesh(
      geometry,
      new MeshBasicMaterial({
        color: 0xffe6e6,
        side: DoubleSide,
      })
    );

    this.selectionMesh.position.y = 5;
    this.scene.add(this.selectionMesh);
  }

  updateSelectionMesh() {
    const selectionColor = new Color();
    selectionColor.setHex(CLICK_COLOR);
    let selectionFaces = [];
    let selectionVertices = [];

    this.plane.geometry.faces.forEach(face => {
      const isFaceSelected = face.color.equals(selectionColor);

      if (isFaceSelected) {
        const clonedFace = face.clone();
        const { a, b, c } = clonedFace;
        const lastIndex = selectionVertices.length;

        selectionVertices.push(
          this.plane.geometry.vertices[a],
          this.plane.geometry.vertices[b],
          this.plane.geometry.vertices[c]
        );

        clonedFace.a = lastIndex;
        clonedFace.b = lastIndex + 1;
        clonedFace.c = lastIndex + 2;

        selectionFaces.push(clonedFace);
      }
    });

    this.selectionMesh.geometry.vertices = selectionVertices;
    this.selectionMesh.geometry.faces = selectionFaces;
    this.selectionMesh.geometry.mergeVertices();

    this.selectionMesh.geometry.verticesNeedUpdate = true;
    this.selectionMesh.geometry.elementsNeedUpdate = true;
    this.selectionMesh.visible = false;
  }

  buildWalls() {
    const outlineVertices = findOutlineVertices(
      this.selectionMesh.geometry.vertices,
      this.selectionMesh.geometry.faces
    );

    const tempV = this.selectionMesh.geometry.vertices;
    const tempF = this.selectionMesh.geometry.faces;
    const shapes = [];
    console.log(tempF);
    

    tempF.forEach((face, index) => {
      const isOutlineA = outlineVertices.includes(tempV[face.a]);
      const isOutlineB = outlineVertices.includes(tempV[face.b]);
      const isOutlineC = outlineVertices.includes(tempV[face.c]);

      const aVec3 = tempV[face.a];
      const bVec3 = tempV[face.b];
      const cVec3 = tempV[face.c];

      if (isOutlineA && isOutlineB) {
        shapes.push([aVec3, bVec3]);
        // const verts = [
        //   aVec3,
        //   bVec3,
        //   bVec3.clone().add(moveYVec),
        //   aVec3.clone().add(moveYVec),
        // ];
        // const mesh = createWallElement(verts);

        // this.scene.add(mesh);
      }

      if (isOutlineA && isOutlineC && index % 2 === 0) {
        shapes.push([aVec3, cVec3]);
        // const verts = [
        //   aVec3,
        //   cVec3,
        //   cVec3.clone().add(moveYVec),
        //   aVec3.clone().add(moveYVec),
        // ];
        // const mesh = createWallElement(verts);

        // this.scene.add(mesh);
      }

      if(isOutlineC && isOutlineB && index % 2 !== 0) {
        shapes.push([cVec3, bVec3]);
        // const verts = [
        //   cVec3,
        //   bVec3,
        //   bVec3.clone().add(moveYVec),
        //   cVec3.clone().add(moveYVec),
        // ];
        // const mesh = createWallElement(verts);

        // this.scene.add(mesh);
      }
    });

    console.log('before', shapes);
    
    const tempShape = shapes.reduce((acc, connection) => {
      const duplicate = acc.find(conn => {
        return (conn[0].equals(connection[0]) || conn[0].equals(connection[1])) &&
          (conn[1].equals(connection[0]) || conn[1].equals(connection[1]))
      });

      if(duplicate) {
        const dupIndex = acc.indexOf(duplicate);
        acc.splice(dupIndex, 1);
      } else {
        acc.push(connection);
      }

      return acc;
    }, [])

    console.log('after', tempShape);

    tempShape.forEach(conn => {
        const verts = [
          conn[0],
          conn[1],
          conn[1].clone().add(new Vector3(0, 1, 0)),
          conn[0].clone().add(new Vector3(0, 1, 0)),
        ];
        const mesh = createWallElement(verts);

        this.scene.add(mesh);
    })
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
    if (
      this.prevHoverFaces.length &&
      !(
        isTheSameFace(hoveredFaces[0], this.prevHoverFaces[0]) ||
        isTheSameFace(hoveredFaces[0], this.prevHoverFaces[1])
      )
    ) {
      const color = getFacesColor(hoveredFaces);

      setFacesColor(hoveredFaces, this.detectHoverPaintingColor(color));

      const prevColor = getFacesColor(this.prevHoverFaces);

      setFacesColor(
        this.prevHoverFaces,
        this.detectPreviouslyHoveredPaintingColor(prevColor)
      );
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

      const firstFaceColor = getFacesColor([
        plane.object.geometry.faces[this.drawStartFaceIndex],
      ]);
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
      } else {
        const hoveredFaces = getIntersectedFaces(plane);

        this.handleHoverPainting(hoveredFaces);

        this.prevHoverFaces = hoveredFaces;
      }

      plane.object.geometry.colorsNeedUpdate = true;
    }
  }
}

export { FloorBuilderService };
