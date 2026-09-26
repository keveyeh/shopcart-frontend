import { set } from 'react-hook-form'
import { Authcontext } from '../../context/AuthContext'
import style from './home.module.css'
import { useContext } from 'react'
import { useRef } from 'react'
function Home(){
    const {name,setName,setIslogin,loginfo} = useContext(Authcontext)
    const inputfile = useRef()
     
    function login(){
        setIslogin(true)
        console.log(loginfo)
        console.log(name)
        console.log(inputfile.current)
       inputfile.current.focus()
        inputfile.current.value = 'yellow'
    }
     
    
return(

    <div className={style.div}>
        <h2 className={style.h2}>Home Page</h2>
        <p>welcome to my home page all you need is in here. all i pray God for is to become a successful man in this world and make all my family members proud and me and contribute a lot in the society with God ahead of all my plans and projects amen</p>
        <input type='text'placeholder='enter your name'  
        onChange={(e)=>{setName(e.target.value)}} ref={inputfile} required/>
        <br></br><button onClick={login}>login</button>
    </div>
)
}
export default Home