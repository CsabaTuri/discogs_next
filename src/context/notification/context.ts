import { createContext, useContext } from "react";

let initialState:any = { state: { text: "", type: "success" },dispatch: () => {}  };

const Context = createContext(initialState);

export const useNotificationContext = () => useContext(Context);

export default Context;
