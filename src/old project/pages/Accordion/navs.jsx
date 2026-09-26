import { useRef, useEffect } from 'react'
import style from './nav.module.css'
import {FaRegMoon,FaSun} from 'react-icons/fa'
function NavBar({search,setSearch,toggle,setToggle}){
   
    const inputField = useRef()
    useEffect(()=>{
     inputField.current.focus()
    },[])
    return(
    <>
    <nav className={`${style.nav} ${toggle ? 'dark':''} `}>
     <div className={style.div}>
        <div className={style.div1}>
         🀄 REACT FAQ
        </div>
        <div className={style.div2}>
        <input type='text' placeholder='Enter question,number' className={style.input} ref={inputField} onChange={(e)=>{setSearch(e.target.value)}} value={search}/>
        <button className={style.btn}>🔍</button>
        </div>
        <div>
            <button className={style.small} onClick={()=>setToggle(!toggle)}>
                            {toggle?<FaRegMoon className={style.Moon}/> : <FaSun className={style.Sun}/>}
                        </button>
                
        </div>
     </div>
    </nav>
    </>
)
}
export default NavBar