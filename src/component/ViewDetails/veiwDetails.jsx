import { FiCalendar, FiClipboard, FiCreditCard, FiDollarSign, FiSmartphone } from 'react-icons/fi'
import style from './viewDetails.module.css'
import { useContext } from 'react'
import { currency } from '../../contextApi/currencyapi'
export default function ViewDetails({setmodal,details,showmodal}){
    const {coin,convertCurrency}=useContext(currency)
    return(
        <>
        <div className={showmodal ?style.container:style.containers}>
           <div className={style.subcontainer}>
            <div className={style.div1}>
                <div className={style.left}>
                    <span className={style.span1}><FiClipboard/></span>
                    <div>
                        <h3>Order Details</h3>
                        <p>view complete information </p>
                    </div>
                </div>
                 <span className={style.span} onClick={()=>setmodal(false)}>X</span>
            </div>
            <div className={style.div2}>
                <div className={style.lefts}>
                    <img src='/file_0000000060dc820a8a2a0c5cde6e33e4.png'/>
                    <div>
                        <h3>Transaction_ref</h3>
                        <p>{details.transaction_ref?details.transaction_ref.slice(0,10):null}</p>
                    </div>
                </div>
                <div className={style.right}>
                    <div style={details.status === 'Pending'?{color:'#92400e',backgroundColor:'#fef3c7'}:details.status === 'Paid'?{color:'#065f46',backgroundColor:'#d1fae5'}:{color:'#991b1b',backgroundColor:'#fee2e2'}}>{details.status}</div>
                </div>
            </div>
             <div className={style.div3}>
                <div className={style.let}>
                    <span><FiClipboard/></span>
                    <div>
                        <p>Order_id</p>
                        <h3>{details.order_number? details.order_number.slice(0,10):null}</h3>
                    </div>
                </div>
                <div className={style.let}>
                    <span><FiDollarSign/></span>
                    <div>
                        <p>Amount</p>
                        <h3>{convertCurrency(details.total_amount)} {coin}</h3>
                    </div>
                </div>
             </div>
             <div className={style.div3}>
                <div className={style.let}>
                    <span><FiCreditCard/></span>
                    <div>
                        <p>Payment Method</p>
                        <h3>{details.payment_method}</h3>
                    </div>
                </div>
                <div className={style.let}>
                    <span><FiSmartphone/></span>
                    <div>
                        <p>Phone Number</p>
                        <h3>{details.phone_number?`${Number(6 + details.phone_number.split(6)[1]).toLocaleString('fr-FR')}`:null}</h3>
                    </div>
                </div>
             </div>
             <div className={style.div4}>
                <span><FiCalendar/></span>
                <div>
                    <p className={style.dic}>Date & Time</p>
                    <h3>{details.created_at ? new Date(details.created_at).toLocaleString('en-GB', { hour12: true }) : 'N/A'}</h3>
                </div>
             </div>
             <div className={style.div5}>
                <button onClick={()=>setmodal(false)}>Close</button>
             </div>
           </div>
        </div>
        
        </>
    )
}