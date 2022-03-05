/* eslint-disable react/prop-types */
import { createContext } from "react";
import useDataprovider from "../hooks/useDataProvider";

export const ContextData = createContext({});

export default function Provider({ children }) {
  const DataProvider = useDataprovider();
  return (
    <ContextData.Provider value={DataProvider}>
      {children}
    </ContextData.Provider>
  );
}
