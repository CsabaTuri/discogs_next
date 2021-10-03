import { createContext ,useContext} from "react"

let initialState:any = { search:{search: {}},dispatch: () => {} }

 const Context = createContext(initialState)

 export const useSearchContext = () => useContext(Context);

 export default Context
