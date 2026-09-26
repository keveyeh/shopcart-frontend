import { useState } from "react";
export default function useChoice(){
const [choice,setChoice] = useState(false)
return( [choice,setChoice])
}