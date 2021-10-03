import React, { useCallback, useReducer } from "react";
import { useLocalStorage } from "react-use";
import { reducer } from "./reducer";
import Context from "./context";

let initialState: any = { isDark: true, dispatch: () => { } };

const usePersistReducer = () => {
  // grab saved value from `localStorage` and
  // a function to update it. if
  // no value is retrieved, use `INITIAL_STATE`
  const [savedState, saveState] = useLocalStorage<any>("isDark", initialState);

  // wrap `reducer` with a memoized function that
  // syncs the `newState` to `localStorage` before
  // returning `newState`. memoizing is important!
  const reducerLocalStorage = useCallback(
    (state, action) => {
      const newState = reducer(state, action);

      saveState(newState);

      return newState;
    },
    [saveState]
  );

  // use wrapped reducer and the saved value from
  // `localStorage` as params to `useReducer`.
  // this will return `[state, dispatch]`
  return useReducer(reducerLocalStorage, savedState);
};

export const Provider = ({ children }: any) => {
  const [state, dispatch] = usePersistReducer();
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
