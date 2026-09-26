  import { useContext } from "react";
import { Navigate,} from "react-router-dom";
import { UserInfo } from "../contextApi/UserLogin";
  export default function ProtectedTransaction({children}){
      const {authUser}= useContext(UserInfo)
      if(authUser.isLogin){
        return children
      }else{
           return <Navigate to='/login' replace/>
      }
  }