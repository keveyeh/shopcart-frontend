import { useState } from "react"
export default function UseCounter(){
    const [count,setCount] = useState(0)
    return {count, setCount}
}