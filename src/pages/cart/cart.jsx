import { FiLock, FiMinus, FiPlus, FiTrash } from "react-icons/fi"
import Navbar from "../../component/navBar/navbar"
import style from './cart.module.css'
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import PaymentModal from "../../component/PaymentMoal/pamentModal"
import { ProductContext } from "../../contextApi/productContext"
import { CartContext } from "../../contextApi/CartContext"
import { UserInfo } from "../../contextApi/UserLogin"
import { currency } from "../../contextApi/currencyapi"

function Cart(){
  const navigate = useNavigate()
    const [modal,setModal]= useState(false)
    const {increment,decrement,deleteElement} = useContext(ProductContext)
    const {cart} = useContext(CartContext)
    const {authUser}= useContext(UserInfo)
    const {coin,convertCurrency}= useContext(currency)

           const subtotal = cart.reduce((acc,CurrentValue)=>{
                 return (Number(CurrentValue.price) * Number(CurrentValue.quantity)) + acc
           },0)
           const shipping = 10000
           
    return(
        <>
        
         <Navbar/>
        <div className={style.container}>
            <div className={style.subcontainer}>
                <div className={style.first}>
                 <h3>Your Cart</h3>
                 <p>Rewiew your items and products to checkout</p>
                </div>
                <div className={style.second}>
                    {
                        cart.length === 0 ? 
                        <div className={style.images}>
                            <img src="/file_000000007eb481f5a6c7b3f57e9be92d.png"/>
                        </div>
                        :
                        <div className={style.two}>
                        <div className={style.last}>
                            <div className={style.heading}>
                                <div className={style.div1}>
                                    <p>PRODUCT</p>
                                </div>
                                <div className={style.div2}>
                                    <p>PRICE</p>
                                </div>
                                <div className={style.div3}>
                                    <p>QUANTITY</p>
                                </div>
                                <div className={style.div4}>
                                    <p>TOTAL</p>
                                </div>
                            </div>
                            <div className={style.main}>
                                {
                                 cart.map((element)=>{
                                    return(
                                    <div className={style.procart} key={element.id}>
                                    <div className={style.product}>
                                        <img src={element.image}/>
                                        <p><strong>{element.name}</strong></p>
                                    </div>
                                    <div className={style.price}>
                                        <p>{convertCurrency(Number(element.price)).toLocaleString('en-US')} {coin}</p>
                                    </div>
                                    <div className={style.act}>
                                        <div className={style.action}>
                                            <span className={style.span1} onClick={()=>{
                                                decrement(element.id,element.quantity)
                                            }}><FiMinus/></span>
                                            <span className={style.span2}><strong>{element.quantity}</strong></span>
                                            <span className={style.span3} onClick={()=>{
                                                increment(element.id)
                                            }}><FiPlus/></span>
                                        </div>
                                    </div>
                                    <div className={style.total}>
                                        <p><strong>{convertCurrency((Number(element.price)* Number(element.quantity))).toLocaleString('en-US')} {coin}</strong></p>
                                        <span className={style.delete} onClick={()=> deleteElement(element.id)}><FiTrash/></span>
                                    </div>
                                </div>
                                  ) })
                                 }
                                
                                 
                            </div>
                            
                        </div>
                        <div className={style.checkout}>
                                <div className={style.order}>
                                    <h3>Order Summary</h3>
                                </div>
                                <div className={style.order2}>
                                    <p>Subtotal ({cart.length} items)</p>
                                    <p>{convertCurrency(subtotal).toLocaleString('en-US')} {coin}</p>
                                </div>
                                <div className={style.order2}>
                                    <p>Shipping</p>
                                    <p>{convertCurrency(shipping).toLocaleString('en-US')} {coin}</p>
                                </div>
                                <div className={style.order3}>
                                    <h3>Total</h3>
                                    <h2 style={{color:'navy'}}>{convertCurrency((subtotal + shipping)).toLocaleString('en-US')} {coin}</h2>
                                </div>
                                <div className={style.order4}>
                                    <button onClick={()=>{
                                        authUser.isLogin ?setModal(true): navigate('/login',{replace:true})
                                        }}><FiLock/> Proceed to Checkout</button>
                                </div>
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
        <PaymentModal modal={modal} setModal={setModal} amount={subtotal + shipping}/>
        </>
    )
}
export default Cart