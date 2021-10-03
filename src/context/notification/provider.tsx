import React, { useReducer } from "react";
import { reducer } from "./reducer";
import Context from "./context";

let initialState = { state: { text: "", type: "success" },dispatch: () => {}  };

export const Provider = ({ children }:any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
