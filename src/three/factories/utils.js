import { Mesh, Box3, Math as TMath, Group } from 'three';

const findRoot = model => {
  let mesh;

  model.traverse(child => {
    if (child instanceof Mesh) {
      mesh = child;
    }
  });

  return mesh;
};

const findFirstMesh = obj => obj.scene.getObjectByProperty('type', 'Mesh');
const findAllMeshes = obj => obj.scene.children;

const getMeshOrGroup = ({ scene }) => {
  const { children } = scene;

  if (children.length === 1) {
    return children[0];
  }

  const group = new Group();
  group.add(...children);

  return group;
};

const fixPosition = mesh => {
  const boundingBox = new Box3().setFromObject(mesh);
  mesh.position.y = Math.abs(boundingBox.min.y);

  return mesh;
};

const applyConfig = config => mesh => {
  if (config.position && mesh) {
    mesh.position.x = config.position.x || mesh.position.x;
    mesh.position.z = config.position.z || mesh.position.z;
    mesh.position.y = config.position.y || mesh.position.y;
  }

  if (config.rotation) {
    mesh.rotateY(config.rotation * TMath.DEG2RAD);
  }

  if (mesh instanceof Group) {
    mesh.name = mesh.children.every(
      child => child.name === mesh.children[0].name
    )
      ? mesh.children[0].name
      : '';
  }

  return mesh;
};

export {
  findRoot,
  fixPosition,
  applyConfig,
  findFirstMesh,
  findAllMeshes,
  getMeshOrGroup,
};
