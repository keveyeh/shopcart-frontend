import style from './calculator.module.css'
import { useState } from 'react'
function Calculator(){
const [element,SetElement] = useState('')
   function numbers(value){
   
   const  display = element 
   SetElement( display + value)
    
   }
   function deletes(){
    SetElement(element.substring(0,element.length - 1))
   console.log(element)
}
function clears(){
    SetElement('')
}
function total(){
    SetElement(eval(element))
}
    return(
        <div className={style.container}>
            <div className={style.input}>
                <input type='text' className={style.sub} value={ element ==''? 0: element} readOnly/>
            </div>
            <div className={style.calcontainer}>
                <div className={style.contains}>
                    <div className={style.first}>
                        <button className={style.btn1}>D</button>
                        <button className={style.btn2}>C</button>
                        <button className={style.btn3}>D</button>
                        
                        <button className={style.btn} onClick={clears}>C</button>
                        <button className={style.btn} onClick={deletes}>D</button>
                    </div>
                    <div className={style.second}>
                        <button className={style.btn} value={0} onClick={()=>{numbers('0')}}>0</button>
                        <button className={style.btn} value={1} onClick={()=>{numbers('1')}}>1</button>
                        <button className={style.btn} onClick={()=>{numbers('2')}}>2</button>
                        <button className={style.btn} onClick={()=>{numbers('3')}}>3</button>
                         <button className={style.btn} onClick={()=>{numbers('-')}}>-</button>
                    </div>
                    <div className={style.second}>
                        <button className={style.btn} onClick={()=>{numbers('4')}}>4</button>
                        <button className={style.btn} onClick={()=>{numbers('5')}}>5</button>
                        <button className={style.btn} onClick={()=>{numbers('6')}}>6</button>
                        <button className={style.btn} onClick={()=>{numbers('7')}}>7</button>
                        <button className={style.btn} onClick={()=>{numbers('+')}}>+</button>
                    </div>
                    <div className={style.second}>
                        <button className={style.btn} onClick={()=>{numbers('8')}}>8</button>
                        <button className={style.btn} onClick={()=>{numbers('9')}}>9</button>
                        <button className={style.btn} onClick={total}>=</button>
                        <button className={style.btn} onClick={()=>{numbers('/')}}>/</button>
                        <button className={style.btn} onClick={()=>{numbers('*')}}>x</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}
export default Calculator