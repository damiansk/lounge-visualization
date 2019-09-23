import { useState, useEffect, useCallback } from 'react';

const useModelAttribute = (model, attributeName) => {
  // TODO Init state from "attributes" or create something more independent from model structure?
  const [attribute, setAttribute] = useState(model.attributes[attributeName]);

  useEffect(
    () => {
      const subscription = model
        .getAttribute$(attributeName)
        .subscribe(setAttribute);

      return () => subscription.unsubscribe();
    },
    [attributeName, model]
  );

  const setModelAttribute = useCallback(
    value => model.setAttribute$(attributeName, value),
    [attributeName, model]
  );

  return [attribute, setModelAttribute];
};

export { useModelAttribute };
