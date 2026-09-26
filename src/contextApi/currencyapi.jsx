import { createContext, useEffect, useState } from "react";




export const currency = createContext()
export default function CurrencyProvider({children}){
    const curr = localStorage.getItem('currencies') || 'FCFA'
    const [coin,setCoin]= useState(curr)
    useEffect(()=>{
     localStorage.setItem('currencies',coin)
    },[coin])
    function convertCurrency(amount){
        let sum;
        if(!amount || amount === 0){
            return 0
        }else{
            if(coin === 'FCFA'){
                sum = amount
            }else if(coin === 'USD'){
                sum = (Number(amount) / 565).toFixed(2)
                
            }else{
                sum = (Number(amount) / 600).toFixed(2)
            }
        }
        return sum
    }
    return(
        <currency.Provider value={{coin,setCoin,convertCurrency}}>
            {children}
        </currency.Provider>
    )
}