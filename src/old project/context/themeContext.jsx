import { createContext } from "react";
import { useState } from "react";
 export const themeContext = createContext()
  
 export default function ThemeProvider({children}){
    const [toggle,setToggle]= useState(false)
    return(
        <themeContext.Provider value={{toggle,setToggle}}>
            {children}
        </themeContext.Provider>
    )
}