import { createContext, useState } from "react"

export const counter = createContext()
export function UseCounter({children}){
    const [count,setCount] = useState(0)
    return(
        <counter.Provider value={{count,setCount}}>
            {children}
        </counter.Provider>
    )
}