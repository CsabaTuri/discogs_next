import { Context as C, createContext, ProviderExoticComponent, useContext } from "react"



let initialState: any = { user: {}, dispatch: () => { } };

const Context: C<any> = createContext<any>(initialState)

export const Provider: ProviderExoticComponent<any> = Context.Provider;

export const useUserContext = () => useContext(Context);

export default Context
