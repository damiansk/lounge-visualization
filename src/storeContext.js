import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModelsStore } from './three/store/ModelsStore';

const StoreContext = React.createContext();
const store = new ModelsStore();

const StoreContextProvider = ({ children }) => {
  const [models, setModels] = useState([]);
  useEffect(() => {
    const subscription = store.getUpdateEvent$().subscribe(setModels);
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    //  investigate rerenders in Threecontainer
    <StoreContext.Provider value={{ models, remove: store.remove }}>
      {children}
    </StoreContext.Provider>
  );
};

StoreContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { StoreContextProvider, StoreContext, store };
