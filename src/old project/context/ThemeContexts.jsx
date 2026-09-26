import { createContext } from "react";
import { useState,useEffect} from "react";
 export const themeContexts = createContext()
  
 export default function ThemeProviders({children}){
     const toggle = JSON.parse(localStorage.getItem('theme')) || false
    const  [toggles,setToggle]= useState(toggle)
    
    useEffect(()=>{
      localStorage.setItem('theme',JSON.stringify(toggles))
    },[toggles])
    const tasks = JSON.parse(localStorage.getItem('Tasc')) || []
   const [task,setTask]= useState(tasks)
    useEffect(()=>{
      localStorage.setItem('Tasc',JSON.stringify(task))
    },[task])
    // for the modal
    const [Modal,setModal]= useState(false)  
    const [search,setSearch] = useState('')  
    return(
        <themeContexts.Provider value={{toggles,setToggle,task,setTask,Modal,setModal,search,setSearch}}>
            {children}
        </themeContexts.Provider>
    )
}