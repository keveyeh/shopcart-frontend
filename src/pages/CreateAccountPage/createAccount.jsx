import style from './createAccount.module.css'
import { FiEye, FiEyeOff, FiLock, FiLogIn, FiMail, FiPhone, FiUser, FiUserPlus } from "react-icons/fi";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
export default function Account(){
    const[activeInput,setActive]= useState(null)
    const [loading,setloading]= useState(false)
    const [message,setMessage]= useState({
        message:'',
        color:''
    })
    const [showModal,setmodal]= useState(false)
    const [showPassword1,setPassword1]= useState({
        type:'password',
        status:false
    })
    const [showPassword2,setPassword2]=useState({
        type:'password',
        status:false
    })
    const [userInfo,setUser] = useState({
        name:'',
        password:'',
        confirmPass:'',
        phone:'',
        email:''
    })
    const navigate = useNavigate()
   async function handleSubmit(e){
    e.preventDefault()
    if(userInfo.confirmPass !== userInfo.password){
         setloading(false)
        setMessage({message:'Password Must Be The Same',color:'red'})
         setmodal(true)
         setTimeout(()=>{
            setmodal(false)
         },3000)
    }else{
        try{
           setloading(true)
        const response = await fetch(`${import.meta.env.VITE_API_URL}/user/createAccount`,
        {
        method:'POST',
        headers:{
        'Content-Type':'application/json'
        },
        body:JSON.stringify(
            {
         name:userInfo.name,
         email:userInfo.email,
         password:userInfo.password,
         phone:userInfo.phone
                }
        )
        }
        )
         const result = await response.json()
         console.log(result)
        if(response.ok){
             setMessage({message:'Account Created Successfully you will be redirected to login',color:'rgb(101, 219, 101)'})
        setmodal(true)
        setTimeout(()=>{
             setmodal(false)
        },3000)
        setloading(false)
         setTimeout(()=>{
            navigate('/login')
         },5000)
        }else{
        setMessage({message:result.message,color:'red'})
        setmodal(true)
        setTimeout(()=>{
             setmodal(false)
        },3000)
        setloading(false)
        }
    }catch(err){
        console.log(err)
        setloading(false)
    }
       
       
    }
       
        
    }
    return(
        <>
        <div className={style.container}>
            
                <div className={style.main}>
                    <div className={style.form}>
                        <form onSubmit={(e)=>{handleSubmit(e)}}>
                            <div className={style.inputs}>
                                <span><FiUser/></span>
                                <div>
                                    <h3>Create Account</h3>
                                    <p>Fill in your details to get started</p>
                                </div>
                            </div>
                            <div className={style.full}>
                                <label>Full Name</label>
                                <div style={activeInput === 1? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                                    <span><FiUser/></span>
                                    <input type="text" placeholder="Enter your full name " required onClick={()=>setActive(1)} onChange={(e)=>setUser({...userInfo,name:e.target.value})}/>                             </div>
                            </div>
                            <div className={style.full}>
                                <label>Phone Number</label>
                                <div style={activeInput === 2? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                                    <span><FiPhone/></span>
                                    <input type="tel" placeholder="Enter your phone number" required onClick={()=>setActive(2)} onChange={(e)=>setUser({...userInfo,phone:e.target.value})}/>                                </div>
                            </div>
                            <div className={style.full}>
                                <label>Email Address</label>
                                <div style={activeInput === 3? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                                    <span><FiMail/></span>
                                    <input type="email" placeholder="Enter your email address" required onClick={()=>setActive(3)} onChange={(e)=>setUser({...userInfo,email:e.target.value})}/> 
                                </div>
                            </div>
                            <div className={style.full}>
                                <label>Password</label>
                                <div style={activeInput === 4? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                                    <span><FiLock/></span>
                                    <input type={showPassword1.type} placeholder="Create a password" minLength={8} required onClick={()=>setActive(4)} onChange={(e)=>setUser({...userInfo,password:e.target.value})}/> 
                                    <span onClick={()=>{showPassword1.type=== 'password'? setPassword1({...showPassword1,type:'text',status:true}): setPassword1({...showPassword1,type:'password',status:false})}}>{showPassword1.status === false ? <FiEyeOff/> : <FiEye/>}</span>
                               </div>
                            </div>
                            <div className={style.full}>
                                <label>Confirm Password</label>
                                <div style={activeInput === 5? {border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                                    <span><FiLock/></span>
                                    <input type={showPassword2.type} placeholder="Confirm your password" minLength={8} required  onClick={()=>setActive(5)} onChange={(e)=>setUser({...userInfo,confirmPass:e.target.value})}/> 
                                    <span onClick={()=>{
                                        showPassword2.type === 'password' ? setPassword2({...showPassword2,type:'text',status:true}) 
                                        : 
                                        setPassword2({...showPassword2,type:'password',status:false})
                                    }}>{showPassword2.status === false ? <FiEyeOff/> : <FiEye/>}</span>
                                 </div>
                            </div>
                            <button type="submit" onLoad={loading}  className={loading ? style.btn2 : style.btn1}> { loading ? <div className={style.loop}>
                                <>
                                 <div className={style.looping}>k</div>
                                <span>Creating Account...</span>
                                </>
                                </div>: <>
                                      <FiUserPlus/><span>Create Account</span>
                                </>}</button>
                        </form>
                        <div className={style.text}>
                            Already have an account? <span><NavLink className={style.navlink} to='/login'>Login</NavLink> <FiLogIn/></span>
                        </div>
                    </div>
                </div>
                <div className={ showModal ? style.message : style.messages} style={{color:`${message.color}`,borderLeft:` 4px solid ${message.color}`}}>
                    {message.message}
                </div>
            
        </div>
       
        </>
    )
}