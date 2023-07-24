import { createContext, useContext, useState, type ReactNode, type SetStateAction, type Dispatch } from "react";
function useStoreData<TData>(initial: TData): [TData, Dispatch<SetStateAction<TData>>] {
    const [store, setStore] = useState<TData>(initial)
    return [store, setStore];
}

type ThemeContextType = ReturnType<typeof useStoreData>;
export const ThemeContext = createContext<null | ThemeContextType>(null)

const ThemeContextProvider = ({ children, initial }: { children: ReactNode, initial: ThemeContextType[0] }) => {
    const [store, setStore] = useStoreData(initial);
    return (
        <ThemeContext.Provider value={[store, setStore]}>
            {children}
        </ThemeContext.Provider >
    )
}

const BasicContext = () => {
    console.count("BasicContext")
    return (
        <div>
            <ThemeContextProvider initial="light">
                <h1>BasicContext Parent</h1>
                <ChildBasicContext />
            </ThemeContextProvider>
        </div>
    )
}



export const ChildBasicContext = () => {
    const [_, setTheme] = useContext(ThemeContext)!;
    console.count("ChildBasicContext")
    return (
        <div><h1>CHild 1</h1>
            <button onClick={() => setTheme(e => e === "light" ? "dark" : "light")}>Change theme</button>
            <GrandChildBasicContext />
        </div>
    )
}
export const GrandChildBasicContext = () => {
    const [theme] = useContext(ThemeContext)!;
    console.count("GrandChildBasicContext")
    return (
        <div><h2>Child 2</h2>
            {theme}
        </div>
    )
}
export default BasicContext
