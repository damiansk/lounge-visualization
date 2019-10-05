import React, { useContext, useMemo } from 'react';
import { ModelsListGroup } from './ModelsListGroup/ModelsListGroup';
import { StoreContext } from '../../storeContext';

const ModelsList = () => {
  const { models, remove } = useContext(StoreContext);

  const modelGroups = useMemo(
    () =>
      models.reduce((acc, model) => {
        const modelType = model.type;
        if (!acc[modelType]) {
          acc[modelType] = [];
        }
        acc[modelType].push(model);
        return acc;
      }, {}),
    [models]
  );

  return (
    <>
      {Object.keys(modelGroups).map((modelType, i) => {
        return (
          <ModelsListGroup
            key={modelType}
            modelGroup={modelGroups[modelType]}
            modelType={modelType}
            onRemove={remove}
          />
        );
      })}
    </>
  );
};

export { ModelsList };
