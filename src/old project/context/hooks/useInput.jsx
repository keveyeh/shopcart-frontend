import { useState } from "react";
export default function useInput(){
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword]= useState('')
    const userInfo = {
        name:name,
        email:email,
        password:password
    }
    return {setName,setEmail,setPassword}
}