import { createContext } from "react";
import { useEffect, useState } from "react";

  export const UserInfo = createContext()
   export default function UserProvider({children}){
  const credential = JSON.parse(localStorage.getItem('userInfo') || '[ ]') 
  const [authUser,setActor] = useState(credential)
 useEffect(()=>{
    localStorage.setItem('userInfo',JSON.stringify(authUser))
 },[authUser])


  return(
    <UserInfo.Provider value={{authUser,setActor}}>
        {children}
    </UserInfo.Provider>
  )
   }