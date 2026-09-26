import style from './accordion.module.css'
import { quizs } from "../../data/FEQ"
import { FaChevronDown,FaChevronUp } from "react-icons/fa6"
import { useState } from 'react'

function Accordion({search,toggle}){
     const [choice,Setchoice] = useState(null)
    function handleClick(index){
      Setchoice(choice === index ? null : index)
      
    }
    const frequency = quizs
    const questions = frequency.filter((element)=>{
     return element.question.toUpperCase().includes(search.toUpperCase())
    })
    console.log(frequency)
   
    
    
return(
    <>
    <div className={`${style.theme} ${toggle ? 'dark':''} `}>
        <div className={style.sub}>
            <div className={style.container}>
            WHAT DO YOU WANT TO KNOW ABOUT REACT BASICS ?
            </div>
            <div className={style.question}>
                { questions.map((element,index)=>{
                    return(
                <div className={style.subcontainer} key={element.id}>
                    <div className={style.div1}>
                        <h4 className={style.h4}>{element.question} ?</h4>
                        <span className={style.span} onClick={()=>{handleClick(index)}}>
                            {choice === index ? <FaChevronDown className={style.chevron}/> : <FaChevronUp className={style.chevron}/>}
                        </span>
                    </div>
                <p className={style.p}>{ choice === index ? element.answer : null}</p>
                </div>
                    )
            })}
            </div>
        </div>
    </div> 
    </>
)
}
export default Accordion