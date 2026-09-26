import {FiSmartphone } from 'react-icons/fi'
import style from './payment.module.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../contextApi/CartContext'
import { UserInfo } from '../../contextApi/UserLogin'
import { currency } from '../../contextApi/currencyapi'
export default function PaymentModal({modal,setModal,amount}){
    const [method,setMethod]= useState('')
    const [active,setActive]=useState(0)
    const [phone,setPhone]= useState('')
    const {coin,convertCurrency}= useContext(currency)
    const [loading,setLoading]= useState(false)
    const [isPaid,setPaid]= useState({
        paid1:false,
        paid2:false
    })
    const [message,setMessage]= useState({
        message:'',
        color:''
    })
    
    const [showModal,setmodal] = useState(false)
    const {cart}= useContext(CartContext)
    const{authUser}= useContext(UserInfo)
    async function authenticate(e){
        e.preventDefault()
        if(!method){
            setMessage(
                {
                    message:'PLEASE CHOOSE A METHOD',
                    color:'red'
                }
            )
            setmodal(true)
            setTimeout(()=>{
              setmodal(false)
            },3000)
            return;
        }
        try {
            setLoading(true)
                         const response = await fetch(`${import.meta.env.VITE_API_URL}/iwomi/`,
                            {
                                method:'POST',
                                headers:{
                                    'Content-Type':'application/json',
                                    'Authorization': `Bearer ${authUser.token}`
                                },
                                body:JSON.stringify({
                                    username: "iwomipay2021",//import.meta.VITE_IWOMIUSERNAME,
                                    password:"iwomipay@2020",//import.meta.VITE_IWOMIPASSWORD,
                                    amount:amount,
                                    cart:cart,
                                    method:method,
                                    phone: "237"+ phone
                                })
                            }
                        )
                        const result = await response.json()
                        console.log(result.orderid)
                        let count = 0
                  const loopStatus = setInterval( async ()=>{
                    try{
                        count++
                          const responses = await fetch(`${import.meta.env.VITE_API_URL}/iwomi/checkStatus/${result.orderid}`) 
                         const results = await responses.json()

                         console.log(results.message)
                        if(responses.ok){
                           if(results.message === 'Pending' && count >=15){
                            setLoading(false)
                            setMessage({
                                message :'TRANSACTION PENDING',
                                color: '#92400e'
                              }
                              )
                              setmodal(true)
                              setTimeout(()=>{
                                 setmodal(false)
                              },3000)
                              clearInterval(loopStatus)
                           }else if(results.message === 'Failed'){
                              setLoading(false)
                            setMessage({
                                message :'TRANSACTION FAILED',
                                color: 'red'
                              }
                              )
                              setmodal(true)
                              setTimeout(()=>{
                                 setmodal(false)
                              },3000)
                            console.log(results.message)
                               clearInterval(loopStatus)
                           }else if(results.message === 'Paid'){
                             setLoading(false)
                             setPaid({
                                paid1:false,
                                paid2:false
                             })
                             localStorage.removeItem('cart')
                             setPhone('')
                             setMessage({
                                message:'TRANSACTION SUCCESSFUL',
                                color:'rgb(101, 219, 101)'
                             })
                             setmodal(true)
                             setTimeout(()=>{
                                setmodal(false)
                             },3000)
                             clearInterval(loopStatus)
                           }
                            
                         }else{
                            console.log(results.message)
                            clearInterval(loopStatus)
                         }
                    }catch(err){
                        console.error(err)
                        clearInterval(loopStatus)
                    } 
                            
                        },4000)
                        
                       
                    }catch(err){
                       setMessage({
                        message: 'Network error',
                        color:'red'
                       })
                       console.log(err)
                       setmodal(true);
                      setTimeout(() => setmodal(false), 3000);
                       setLoading(false)
                    }
                }
    return(
        <>
        <div className={modal?style.container: style.containers}>
            
            <div className={ showModal? style.message:style.messages} style={{borderLeft :`4px solid ${message.color}`,color:`${message.color}`}}>
                {message.message}
            </div>
           <div className={style.good}>
            <div className={style.main}>
                <div className={style.cancel}>
                    <span onClick={()=>{loading ?null :setModal(false)}}>x</span>
                </div>
                <div className={style.div1}>
                    <span><FiSmartphone/></span>
                    <h2>Mobile Money Payment</h2>
                    <p>Choose your mobile money provider and enter your phone number to complete the payment</p>
                </div>
                <div className={style.div2}>
                    <div className={method === 'MTN' && isPaid.paid1 === true?style.imag:style.image}>
                        <div className={style.radio}>
                            <input type='radio' name='method'  onChange={(e)=>{
                                if(e.target.checked){
                                    setMethod('MTN')
                                    setActive(0)
                                    setPaid({...isPaid,paid1:true})
                                }
                            }} checked={isPaid.paid1}/>
                        </div>
                        <img src='/7feb0256dc66ee941c1a5d4c945ed60b.jpg'/>
                    </div>
                    <div className={ method === 'ORANGE' && isPaid.paid2 === true? style.imag: style.image}>
                        <div className={style.radio}>
                            <input type='radio' name='method' onChange={(e)=>{
                                if(e.target.checked){
                                    setMethod('ORANGE')
                                    setActive(0)
                                    setPaid({...isPaid,paid2:true})
                                }}} checked={isPaid.paid2}/>
                        </div>
                        <img src='/ca4c4a56fa60322f150f0f3a57547956.jpg'/>
                    </div>
                </div>
                <div className={style.great}>
                    <h3>Amount</h3>
                    <h3>{convertCurrency(amount).toLocaleString('en-US')} {coin}</h3>
                </div>
                <form className={style.forms} onSubmit={(e)=>authenticate(e)}>
                    <div className={style.form}>
                        <label>Phone Number</label>
                       <div className={style.last} style={active === 1 ?{border:' 2px solid navy'}: {border:'1px solid hsl(0,0%,70%)'}}>
                        <span><FiSmartphone/></span>
                         <input type='tel' placeholder='6XX XXX XXX' required onClick={()=>setActive(1)} onChange={(e)=>{
                            setPhone(e.target.value)
                         }} maxLength={9} value={phone}/>
                       </div>
                    </div>
                    <div className={style.btn}>
                        <button type='submit' disabled={loading}className={loading ? style.buttons : style.button} onClick={()=>{setActive(0)
                            }
                        }>{loading ? 
                        <div className={style.spin}>
                           <span className={style.s1}>k</span>
                           <span className={style.s2}>Processing...</span>
                        </div>: 'Proceed Payment'}</button>
                    </div>
                </form>
            </div>
           </div>
        </div>
        </>
    )
}