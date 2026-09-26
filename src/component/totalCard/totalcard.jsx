import { ProductContext } from '../../contextApi/productContext'
import Card from '../Onecard/onecard'
import style from './totalcard.module.css'
import {  useContext } from 'react'
export default function AllCards({page,search}){
        const {products,loading} = useContext(ProductContext)
        let pageNum;
        if(search.trim()){
           pageNum = products.filter((element)=>{
            return element.name.toLowerCase().includes(search.trim().toLowerCase())
           })
        }else{
            if(page===1){
              pageNum = products.slice(0,4)
            }else if(page===2){
                pageNum = products.slice(4,8)
            }else if(page===3){
                pageNum = products.slice(8,12)
            }else if(page===4){
                pageNum = products.slice(12,16)
            }else{
                pageNum = products.slice(16)
            }
        }
       
       
    return(
        <>
         
            {
                loading? <div className={style.div4}>
                    <div className={style.div1}>
                        <div className={style.state}></div>
                        <span>Loading...</span>
                    </div>
                    </div> 
                    : 
                    <div className={style.good}>
                    {
                       pageNum.length === 0 ?
                       <div className={style.images}>
                        <img src='/file_00000000929082109b04c3ee8cc01e8e.png'/>
                       </div> 
                       :
                       <div className={style.product}>
                       { pageNum.map((element)=>{
                          return (<Card 
                          key={element.id}
                          id={element.id}
                          name={element.name}
                          price={element.price}
                          image={element.image}
                          />
                       )})
                        }
                    </div>
                    }
                </div>
                    
                    
            }
           

        </>
    )
} 