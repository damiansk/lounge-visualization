import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModelsStore } from './three/store/ModelsStore';

const StoreContext = React.createContext();
const store = new ModelsStore();

const StoreContextProvider = ({ children }) => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    // TODO: refactor getUpdateEvent$, should return new array?
    const subscription = store
      .getUpdateEvent$()
      .subscribe(mod => setModels([...mod]));
    return subscription.unsubscribe;
  }, []);

  return (
    //  investigate rerenders in Threecontainer
    <StoreContext.Provider
      value={{
        models,
        remove: store.remove,
        createJson: store.createJson,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoreContextProvider, StoreContext, store };
