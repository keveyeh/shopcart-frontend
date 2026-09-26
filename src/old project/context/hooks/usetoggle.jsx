import { useState } from "react";
export default function useToggle(initialValue = false){
    let [toggle,setToggle] = useState(initialValue)
 function isOpen(){
    if(!toggle){
       setToggle(true)
    }else{
       setToggle(false)
    }
    
 }
 return {toggle,isOpen}
}