import style from './clock.module.css'
import { useEffect,useState} from 'react'


 export default function Clock(){
    const [digital,setDigital] = useState('00:00:00')
    useEffect(()=>{
             
        const interval =  setInterval(()=>{
                 let time = new Date()
                 let minute =    time.getMinutes()
                 let seconds =  time.getSeconds()
                 let hours =  time.getHours()
               seconds = seconds < 10 ? `0${seconds}`: seconds
               minute = minute < 10 ? `0${minute}`:minute
               hours = hours < 10? `0${hours}`:hours
           let total =     `${hours} : ${minute} : ${seconds}`
           setDigital(total)
    },1000)
    console.log(interval)
    return ()=> clearInterval(interval)
    },[])
        
    
return(
    <div className={style.container}>
        <h2 className={style.h2}>Clock</h2>
        <h2 className={style.h2}>
           { digital}
        </h2>
    </div>
)
}