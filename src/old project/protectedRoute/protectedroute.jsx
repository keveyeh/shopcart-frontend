import { Authcontext } from "../context/AuthContext"
import { useContext } from "react"
import { Navigate } from "react-router-dom"
 function ProtectedRoute({children}){
const {name,setName,setIslogin,loginfo} = useContext(Authcontext)
if(!loginfo){
    return <Navigate to='/'/>
}else{
    return children
}
}
export default ProtectedRoute