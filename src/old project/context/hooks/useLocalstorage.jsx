import { useState } from "react";
export default function useLocalStorage(){
const name = localStorage.getItem('username') 
const [newName,setName] = useState('')
localStorage.setItem('username',name);
return {newName, setName}
}