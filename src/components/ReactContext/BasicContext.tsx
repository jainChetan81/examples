import React, { type ReactNode, createContext, useContext, useState, useCallback } from "react"

type ThemeContextType = {
    theme: "light" | "dark";
    setTheme: React.Dispatch<React.SetStateAction<"light" | "dark">>
}
export const ThemeContext = createContext<null | ThemeContextType>(null)
const ThemeContextProvider = ({ children, initial = "light" }: { children: ReactNode, initial: ThemeContextType["theme"] }) => {
    const [theme, setTheme] = useState<ThemeContextType["theme"]>(initial)

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
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
    const { setTheme } = useContext(ThemeContext)!;
    console.count("ChildBasicContext")
    return (
        <div><h1>CHild 1</h1>
            <button onClick={() => setTheme(e => e === "light" ? "dark" : "light")}>Change theme</button>
            <GrandChildBasicContext />
        </div>
    )
}
export const GrandChildBasicContext = () => {
    const { theme } = useContext(ThemeContext)!;
    console.count("GrandChildBasicContext")
    return (
        <div><h2>Child 2</h2>
            {theme}
        </div>
    )
}
export default BasicContext
