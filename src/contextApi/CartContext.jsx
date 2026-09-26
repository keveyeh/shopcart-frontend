import { createContext, useEffect, useState } from "react";

export const CartContext = createContext()

export default function CartProvider({children}){
    const cartDetails = JSON.parse(localStorage.getItem('cart') || '[]') 
    const [cart,setCart] = useState(cartDetails)
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])
    return(
        <CartContext.Provider value={{cart,setCart}}>
            {children}
        </CartContext.Provider>
    )
}