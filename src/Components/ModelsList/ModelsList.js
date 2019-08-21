import React, { useContext } from 'react';
import { ModelsListGroup } from './ModelsListGroup/ModelsListGroup';
import { StoreContext } from '../../storeContext';

const ModelsList = () => {
  const { models, remove } = useContext(StoreContext);

  const modelGroups = models.reduce((acc, model) => {
    const modelName = model.getName();
    if (!acc[modelName]) {
      acc[modelName] = [];
    }

    acc[modelName].push(model);
    return acc;
  }, {});

  return (
    <>
      {Object.keys(modelGroups).map((modelName, i) => {
        return (
          <ModelsListGroup
            key={modelName}
            modelGroup={modelGroups[modelName]}
            modelName={modelName}
            onRemove={remove}
          />
        );
      })}
    </>
  );
};

export { ModelsList };
