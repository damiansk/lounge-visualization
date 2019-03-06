const getModelIndex = (arr, type) => {
  let modelIndex;
  arr.forEach((element, index) => {
    if (element.type === type) {
      modelIndex = index;
    }
  });

  return modelIndex;
};

export { getModelIndex };
