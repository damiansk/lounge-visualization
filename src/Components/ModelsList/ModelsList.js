import React, { useContext, useMemo } from 'react';
import { ModelsListGroup } from './ModelsListGroup/ModelsListGroup';
import { StoreContext } from '../../storeContext';

const ModelsList = () => {
  const { models, remove } = useContext(StoreContext);

  const modelGroups = useMemo(
    () =>
      models.reduce((acc, model) => {
        const modelName = model.getName();
        if (!acc[modelName]) {
          acc[modelName] = [];
        }
        acc[modelName].push(model);
        return acc;
      }, {}),
    [models]
  );

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
