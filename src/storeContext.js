import React from 'react';
import { ModelsStore } from './three/store/ModelsStore';

export const StoreContext = React.createContext(new ModelsStore());
