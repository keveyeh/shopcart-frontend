import  styles  from "./count.module.css"
import { useState } from "react"
import { useContext } from "react"
import { themeContext } from "../../context/themeContext"
import {FaRegMoon,FaSun} from 'react-icons/fa'

function Count(){
    const {toggle,setToggle} = useContext(themeContext)
    const [count,setCount] = useState(0)
     function mode(){
        if(toggle){
           setToggle(false)
        }else{
            setToggle(true)
        }
     }
    return(
        <>
       <div className={`${styles.bod} ${toggle ? 'dark':''} `}>
         <div className={styles.container}>
            <div className={styles.sub}>
            <button className={styles.small} onClick={mode}>
                {toggle?<FaRegMoon className={styles.Moon}/> : <FaSun className={styles.Sun}/>}
            </button>
        </div>
          <h1  className={styles.h1}>{count}</h1>
          <div className={styles.div}>
            <button onClick={()=>setCount(count+1)} className={styles.btn}>
                increment
            </button>
            <button onClick={()=>setCount(0)} className={styles.btn}>
                 reset
            </button>
            <button onClick={()=> count >0 ? setCount(count-1): 0} className={styles.btn}>
                decrement
            </button>
          </div>
        </div>
       </div>
        </>
    )
}
export default Count