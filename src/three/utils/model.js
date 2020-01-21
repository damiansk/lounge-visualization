import { Group } from 'three';

const updateMeshOrGroup = (object, callback) => {
  if (object instanceof Group) {
    object.children.forEach(callback);
  } else {
    callback(object);
  }
};

export { updateMeshOrGroup };
