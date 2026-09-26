import { useContext } from 'react'
import style from './oneCard.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { ProductContext } from '../../contextApi/productContext'
import { currency } from '../../contextApi/currencyapi'
 export default function Card({id,name,price,image,}){
    const {addCart} = useContext(ProductContext)
    const {coin,convertCurrency}= useContext(currency)
   
    return(

                         <div className={style.image}>
                           <div className={style.images}>
                               <img src={image} />
                           </div>
                           <div className={style.heading}>
                               <p style={{fontWeight:'bold'}}>{name}</p>
                               <p style={{color:'rgb(20, 20, 85)',fontWeight:'bold'}}>{convertCurrency(Number(price)).toLocaleString('en-US')} {coin}</p>
                           </div>
                           <div className={style.button}>
                               <button onClick={()=>{addCart(id,name,price,image)}}><FiShoppingCart/>Add to Cart</button>
                           </div>
                       </div>
                              
    ) 
}