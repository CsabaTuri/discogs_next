import { Context as C, createContext, ProviderExoticComponent, useContext } from "react"

let initialState: any = { isDark: true, dispatch: () => { } }

const Context: C<any> = createContext<any>(initialState)

export const Provider: ProviderExoticComponent<any> = Context.Provider;

export const useDarkContext = () => useContext(Context);

export default Context

