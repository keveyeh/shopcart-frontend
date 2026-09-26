import style from './nav.module.css'
import {FaRegMoon,FaSun} from 'react-icons/fa'
import { NavLink } from "react-router-dom"
import { themeContexts } from '../../context/ThemeContexts'
import { useContext, useState } from 'react'
function Nav(){
 const {toggles,setToggle,task,setTask,setSearch} =  useContext(themeContexts)
 const [addtask,setAdd] = useState('')
 const {Modal,setModal}= useContext(themeContexts)
 function addtasks(){
    const date = new Date()
    const minute = date.getMinutes()
    const hour = date.getHours() < 12 ? `${date.getHours()}:${minute} AM` : `${date.getHours()}:${minute} PM`
    if(addtask !== ''){
     const duplicate = task.find((element)=>{
        return element['task'].toUpperCase() === addtask.toUpperCase() 
       })
       if(duplicate){
        alert('pls task already exist')
       }else{
          setTask([...task,{task:`${addtask.toUpperCase()}`,time:`${hour}`,status:'active'}])
       }
    }else{
        alert('enter a task pls')
    }
     setAdd('')
 }

     return(
        <>
        <nav className={style.nav}>
            <div className={style.div}>
                <div className={style.left}>📋 TODO-LIST</div>
                <div className={style.mid}>
                    <input className={style.input} type="text" placeholder="Search task" onChange={(e)=>setSearch(e.target.value)}/>
                    
                    <button className={style.add} onClick={()=>setModal(true)}>+Add task</button>
                </div>
                <div className={style.right}>
               <div className={style.tag}>
                 <NavLink to='/all' className={({isActive})=>
                    isActive? style.link : style.links
                }>All
                </NavLink>
                <NavLink to='/active' className={({isActive})=>
                    isActive? style.link : style.links
                }>
                   Active
                </NavLink >
                <NavLink to='/complete' className={({isActive})=>
                    isActive? style.link : style.links
                }>
                    Completed
                </NavLink>
               </div>
               <div>
                <button onClick={()=>setToggle(!toggles)} className={style.btn}>
                    {toggles? <FaSun className={style.sun}/>: <FaRegMoon className={style.moon}/>}
                </button>
               </div>
                </div>
            </div>
        </nav>
         <div className={ Modal?style.showmodal : style.hidemodal}>
                    <div className={style.container}>
                        <div className={style.sub}>
                            <h4 className={style.h4}>ADD TASK</h4>
                            <span className={style.span} onClick={()=>setModal(false)}>x</span>
                        </div>
                        <input type='text' placeholder='Enter task' className={style.inputs} onChange={(e)=>setAdd(e.target.value)} value={addtask}/>
                        <button className={style.btn2} onClick={addtasks}>
                            Add Task
                        </button>
                    </div>
                </div>
        </>
    )
}
export default Nav