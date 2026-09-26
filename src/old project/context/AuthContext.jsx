import { createContext} from "react";
import { useState } from "react";

export const Authcontext = createContext()
export default function AuthProvider({children}){
    
    const [ name,setName] = useState('')
    const [loginfo,setIslogin] = useState(false)
    return(
        <Authcontext.Provider value ={{name,setName,setIslogin,loginfo}}>
            {children}
        </Authcontext.Provider>
    )
}