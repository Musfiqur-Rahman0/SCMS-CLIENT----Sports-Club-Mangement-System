import React from "react";
import { GlobalContext } from "./GlobalContext";

const GlobalProvider = ({ children }) => {
  return <GlobalContext.Provider>{children}</GlobalContext.Provider>;
};

export default GlobalProvider;
