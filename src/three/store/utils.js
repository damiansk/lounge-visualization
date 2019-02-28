import { Math as TMath } from 'three';

const exportToJsonFile = jsonData => {
  const dataStr = JSON.stringify(jsonData);
  const dataUri = `data:application/json;charset=utf-8, ${encodeURIComponent(
    dataStr
  )}`;
  const exportFileDefaultName = 'models.json';
  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

const getModelIndex = (arr, name) => {
  let modelIndex; 
  arr.forEach((element, index) => {
    if (element.type === name) {
      modelIndex = index;
    }
  });

  return modelIndex;
};

const addModelConfig = (arr, model) => {
  const newConfig = {
    position: {
      x: model.mesh.position.x,
      z: model.mesh.position.z,
    },
    rotation: model.mesh.rotation._y * TMath.RAD2DEG,
  };

  arr.push(newConfig);
}

const addModel = (arr, model) => {
  arr.push({
    type: model.mesh.name,
    configs: [
      {
        position: {
          x: model.mesh.position.x,
          z: model.mesh.position.z,
        },
        rotation: model.mesh.rotation._y * TMath.RAD2DEG,
      },
    ],
  });
}

export { exportToJsonFile, getModelIndex, addModelConfig, addModel };
