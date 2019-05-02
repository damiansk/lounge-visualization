import { Mesh, Box3, Math as TMath } from 'three';

const findRoot = model => {
  let mesh;

  model.traverse(child => {
    if (child instanceof Mesh) {
      mesh = child;
    }
  });

  return mesh;
};

const findFirstMesh = obj =>
  obj.scene.getObjectByProperty('type', 'Mesh');

const fixPosition = mesh => {
  const boundingBox = new Box3().setFromObject(mesh);
  mesh.position.y = Math.abs(boundingBox.min.y);

  return mesh;
};

const applyConfig = config => mesh => {
  if (config.position) {
    mesh.position.x = config.position.x || mesh.position.x;
    mesh.position.z = config.position.z || mesh.position.z;
    mesh.position.y = config.position.y || mesh.position.y;
  }

  if (config.rotation) {
    mesh.rotateY(config.rotation * TMath.DEG2RAD);
  }

  return mesh;
};

export { findRoot, fixPosition, applyConfig, findFirstMesh };
