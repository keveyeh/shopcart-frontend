import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const ProductContext = createContext()
export default function ProductProvider({children}){
    const [products,setProducts]= useState([])
        const [loading,setLoading]=useState(true)
        const{cart,setCart} =useContext(CartContext)
        const [newItems,setNewItems] = useState([])
        const [error,setError]=useState('')
        useEffect(()=>{
            const fetchProduct = async ()=>{
                try{
                  const response = await fetch(`${import.meta.env.VITE_API_URL}/products/`)
                  const result = await response.json()
                  if(!response.ok){
                    setError(result.message)
                    return
                  }
                  setProducts(result.data)
                }catch(err){
                    setError('server error')
                    console.log(err.message)
                }finally{
                    setLoading(false)
                }
                
            }
            fetchProduct()
               
        },[])
            
         function addCart(id,name,price,image){
                const found = cart.find(element => element.id ===id)
                if(found){
                    setCart(cart.map(item=> item.id === id ? {...item,quantity: item.quantity + 1}: item))
                }else{
                    setCart([...cart,{id:id,name:name,price:price,image:image,quantity:1}])
                }
               
        }   
         function deleteElement(id){
            setCart(cart.filter(element=>element.id !== id))
        }
        function increment(id){
           setCart(cart.map(element=> element.id === id ?{...element,quantity: element.quantity + 1}:element))
        }  
        function decrement(id,quantity){
             if(quantity>1){
                setCart(cart.map(element=>element.id === id ? {...element,quantity: element.quantity - 1}:element))
             }else{
                deleteElement(id)
             }
        }  
       
       

            
    return(
        <ProductContext.Provider value={{products,loading,error,newItems,setNewItems,addCart,increment,decrement,deleteElement}}>
            {children}
        </ProductContext.Provider>
        )
     }