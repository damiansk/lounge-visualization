const exportToJsonFile = (fileName, jsonData) => {
  const dataStr = JSON.stringify(jsonData);
  const dataUri = `data:application/json;charset=utf-8, ${encodeURIComponent(
    dataStr
  )}`;
  const exportFileDefaultName = `${fileName}.json`;
  const linkElement = document.createElement('a');

  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

export { exportToJsonFile };
