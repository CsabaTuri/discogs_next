import { createContext ,useContext} from "react"

let initialState:any = {  data: {} ,dispatch: () => {}  };

 const Context = createContext(initialState)

 export const useDataContext = () => useContext(Context);

 export default Context
