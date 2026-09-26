import { useContext, useEffect, useState } from "react";
import Navbar from "../../component/navBar/navbar";
import style from './transaction.module.css'
import ViewDetails from "../../component/ViewDetails/veiwDetails";
import { UserInfo } from "../../contextApi/UserLogin";
import { currency } from "../../contextApi/currencyapi";
export default function Transaction(){
    const {authUser} = useContext(UserInfo)
    const [showmodal,setmodal]= useState(false)
    const [details,setDetails]= useState([])
    const [transaction,setTransaction] = useState([])
    const [loading,setLoading]= useState(false)
    const {coin,convertCurrency} = useContext(currency)
    async function transactionHistory(){
        try{
            setLoading(true)
          const response = await fetch(`${import.meta.env.VITE_API_URL}/iwomi/transactionHistory/`,{
            method:'GET',
            
                headers:{
                  'Authorization':`Bearer ${authUser.token}`
                }
            
            })
          if(response.ok){
            const result = await response.json()
            setTransaction(result.transaction)
          }
          
        }catch(err){
              console.error(err.message)
        }finally{
            setLoading(false)
        }
    }
    useEffect(()=>{
    transactionHistory()
    },[])
    
    return(
        <>
        <Navbar/>
        <div className={style.container}>
                    <div className={style.subcontainer}>
                        <div className={style.first}>
                         <h3>Your Transactions</h3>
                         <p>view your past orders and payments history.</p>
                        </div>
                        {
                            loading ? 
                            <div className={style.spin}>
                               <span className={style.s1}>k</span>
                               <span className={style.s2}>Loading...</span>
                            </div>
                            : 
                            <div className={style.second}>
                            {
                                transaction.length === 0 ? 
                                <div className={style.images}>
                                    <img src="/file_0000000060dc820a8a2a0c5cde6e33e4.png"/>
                                </div>
                                :
                                <div className={style.two}>
                                <div className={style.last}>
                                    <div className={style.heading}>
                                        <div className={style.div1}>
                                            <p>ORDER ID</p>
                                        </div>
                                        <div className={style.div2}>
                                            <p>DATE</p>
                                        </div>
                                        <div className={style.div3}>
                                            <p>TRANSACTION_REF</p>
                                        </div>
                                        <div className={style.div4}>
                                            <p>PAYMENT METHOD</p>
                                        </div>
                                        <div className={style.div5}>
                                            <p>AMOUNT</p>
                                        </div>
                                        <div className={style.div6}>
                                            <p>STATUS</p>
                                        </div>
                                        <div className={style.div7}>
                                            <p>ACTION</p>
                                        </div>
                                    </div>
                                    <div className={style.main}>
                                        {
                                            transaction.map((element)=>(
                                                <div className={style.procart} key={element.order_number}>
                                            <div className={style.orderId}>
                                                {element.order_number.slice(0,10)}
                                            </div>
                                            <div className={style.price}>
                                                <p>{element.created_at ? new Date(element.created_at).toLocaleString('en-GB', { hour12: true }) : 'N/A'}</p>

                                            </div>
                                            <div className={style.product}>
                                               <p className={style.p1}>{ element.transaction_ref.slice(0,10)}</p>
                                            </div>
                                            <div className={style.pay}>
                                                <div className={style.method} style={element.payment_method === 'MTN'?{backgroundColor:'#FFCC08',color: 'black'}:{backgroundColor:'#FF7900',color:'white'}}>
                                                    {element.payment_method==='MTN'?'MTN':'ORG.'}
                                                </div>
                                                <div className={style.bag}>
                                                    <h4>{element.payment_method === 'MTN'?'MTN Mobile Money':'ORANGE MONEY'}</h4>
                                                    <p>{Number(element.phone_number).toLocaleString('fr-FR')}</p>
                                                </div>
                                            </div>
                                            <div className={style.amount}>
                                               <strong>{convertCurrency(element.total_amount)} {coin}</strong> 
                                            </div>
                                            <div className={style.dis}>
                                                <div className={style.status} style={element.status === 'Pending'?{color:'#92400e',backgroundColor:'#fef3c7'}:element.status === 'Paid'?{color:'#065f46',backgroundColor:'#d1fae5'}:{color:'#991b1b',backgroundColor:'#fee2e2'}}>
                                                    {element.status}
                                                </div>
                                            </div>
                                            <div className={style.detail}>
                                                <div className={style.view} onClick={()=>{
                                                    setDetails(element)
                                                    setmodal(true)
                                                }}>
                                                    view Details
                                                </div>
                                            </div>
                                            
                                        </div> 
                                            ))
                                        }
                                    </div>
                                    
                                </div>
                                
                            </div>
                            }
                        </div>
                        }
                    </div>
                </div>
               <ViewDetails details={details} showmodal={showmodal} setmodal={setmodal}/>
        </>
    )
}