import { FiEye, FiEyeOff, FiLock, FiLogIn, FiMail } from 'react-icons/fi'
import style from './login.module.css'
import { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserInfo } from '../../contextApi/UserLogin'
export default function Login(){
    const[activeInput,setActive]= useState(0)
    const [loading,setloading]=useState(false)
    const [message,setMessage]= useState({
        message:'',
        color:''
    })
    const [showModal,setmodal]= useState(false)
    const {setActor} = useContext(UserInfo)
    const [showpassword1,setPassword1] = useState({
        type:'password',
        status: false
    })
     const [userInfo,setUser] = useState({
            email:'',
            password:'',
        })
        const navigate = useNavigate()
       async function handleSubmit(e){
        e.preventDefault()  
        try{   
            setloading(true)          
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`,
            {
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify(
                {
             email:userInfo.email,
             password:userInfo.password,
                    }
            )
            }
            )
            const result = await response.json()
            if(response.ok){
                setloading(false)
                   setMessage({message:'Login Successfully you will be redirected shortly',color:'rgb(101, 219, 101)'})  
                   setmodal(true)
                   setTimeout(()=>{
                    setmodal(false)
                   },3000)    
                   setActor({name:result.user['name'],token:result.token,isLogin:true})  
                   setTimeout(() => {
                     return navigate('/products')
                   }, 5000);
                  
            }else{
                setloading(false) 
                setMessage({message:result.message,color:'red'})  
                   setmodal(true)
                   setTimeout(()=>{
                    setmodal(false)
                   },3000)   
                   
            }
        }catch(err){
            console.log(err)
            setloading(false)
        }
            
        }
    return(
        <>
        <div className={style.container}>
          <div className={style.div}>
             <form className={style.form} onSubmit={(e)=>handleSubmit(e)}>
            <div className={style.div1}>
                <span><FiLock/></span>
                <h3>Login to your Account</h3>
                <p>Enter your email and password to access your account</p>
            </div>
            <div className={style.div2}> 
                <label>Email Addess</label>
                <div style={activeInput === 1? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                    <span><FiMail/></span>
                    <input type='text' placeholder='Enter your email' required onClick={()=>setActive(1)} onChange={(e)=>setUser({...userInfo,email:e.target.value})}/>
                </div>
            </div>
            <div className={style.div2}>
                <label>Password</label>
                <div style={activeInput === 2? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                    <span><FiLock/></span>
                    <input type={showpassword1.type}placeholder='Enter your password' minLength={8} required onClick={()=>{setActive(2)}} onChange={(e)=>setUser({...userInfo,password:e.target.value})}/>
                    <span onClick={()=>{
                        showpassword1.type === 'password'? setPassword1({...showpassword1,type:'text',status:true}): setPassword1({...showpassword1,type:'password',status:false})
                    }} >{ showpassword1.status === false ?<FiEyeOff/> : <FiEye/>}</span>
                </div>
            </div>
            <div className={style.div3}>
                <button type='submit'onLoad={loading} className={loading?style.btn2:style.btn1}>
                    {
                        loading ? <div className={style.loop}>
                            <>
                            <div className={style.looping}></div>
                            <span>Login In...</span>
                            </>
                        </div>
                        :
                        <>
                         Login <FiLogIn/>
                        </>
                    }
                   
                </button>
            </div>
            <p className={style.p}>Don't have an account? <span><NavLink className={style.navlink} to='/createAccount'>Create account</NavLink></span></p>
           </form>
          </div>
          <div className={ showModal ? style.message : style.messages} style={{color:`${message.color}`,borderLeft:` 4px solid ${message.color}`}}>
                              {message.message}
        </div>
        </div>
        </>
    )
}