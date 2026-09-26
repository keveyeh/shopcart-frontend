import style from './todolist.module.css'
import { themeContexts } from '../../context/ThemeContexts'
import { useContext, useState,useRef } from 'react'
function All(){
    const {task,setTask,search} = useContext(themeContexts)
    const [modal,setModal] = useState(false)
    const [edit,setEdit]= useState('')
    const [index,setIndex] = useState(null)
    const inputfield = useRef()
    let searchTask;
     if(search !== ''){
         searchTask = task.filter((element)=>{
            return element['task'].includes(search.toUpperCase())
        })
     }else{
        searchTask = [...task]
     }
    function saveTask(){
    const tasks = task.map((element,i)=>{
      return i === index ? {...element,task:`${edit.toUpperCase()}`}: element
    })
    setTask(tasks)
    
    }
    function deletes(index){
        let choice = confirm('do you want to delete this task')
        if(choice){
        const del = task.filter((element,i)=>{
            return index !== i
        })
        setTask(del)
    }
    }
return(
  <>
    <div className={style.div1}>
      {searchTask.map((element,index)=>(
        <div key={index} className={style.container}>
            <div className={style.sub}>
               <div className={style.div}>
                 <input type='checkbox' className={style.check} onChange={(e)=>{
                    
                    if(e.target.checked){
                       
                       const  completes = task.map((elements)=>{
                             return element['task'] === elements['task'] ? {...elements,status:'complete'} : elements
                        })
                        setTask(completes)
                    }else{
                     const   complet = task.map((elements)=>{
                            return element['task'] === elements['task'] ? {...elements,status:'active'} : elements
                        })
                        setTask(complet)
                    }
                 }} checked={element.status === 'complete'}/>
                <h3 className={style.h3}>{element['task']}</h3>
               </div>
                <div className={style.action}>
                    <button className={style.edit} onClick={()=>{setModal(true)
                        setEdit(element['task'])
                        setIndex(index)
                        inputfield.current.focus()
                    }}>✏️</button>
                    <button className={style.del} onClick={()=>{
                        deletes(index)
                    }}>🗑️</button>
                </div>
            </div>
            <div>
                <span className={style.span}>{element['time']}</span>
            </div>
        </div>
      ))}
    </div>
     <div className={ modal?style.showmodal : style.hidemodal}>
                        <div className={style.containers}>
                            <div className={style.subs}>
                                <h4 className={style.h4}>ADD TASK</h4>
                                <span className={style.spans} onClick={()=>{
                                    setModal(false)
                                }}>x</span>
                            </div>
                            <input type='text' placeholder='Enter task' className={style.inputs} value={edit} onChange={(e)=>setEdit(e.target.value)} ref={inputfield}/>
                            <button className={style.btn2} onClick={saveTask}>
                                Add Task
                            </button>
                        </div>
                    </div>
                    </>
)
}
export default All