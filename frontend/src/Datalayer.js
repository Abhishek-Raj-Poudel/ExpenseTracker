// First we import createContext, useContext and reducer
import { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();

// this function takes in initialstate and reducer to passdown the values
// to our childern(In our case its the App component wrapped by this datalayer
//context) component

export const DataLayer = ({ initialState, reducer, children }) => {
  <DataLayerContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataLayerContext.Provider>;
};

export const useDataLayerValue = () => useContext(DataLayerContext);
