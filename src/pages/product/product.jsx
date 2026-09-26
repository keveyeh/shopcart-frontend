import { FiSearch} from "react-icons/fi";
import Navbar from "../../component/navBar/navbar";
import style from './product.module.css'
import { useState} from "react";
import AllCards from "../../component/totalCard/totalcard";
export default function Product(){
    const [page,setPage]= useState(1)
    const [search,setSearch]= useState('')
return(
    <>
    <Navbar/>
    <div className={style.container}>
        <div className={style.div1}>
            <div className={style.div2}>
                <h3>All Products</h3>
                <p>Choose your favorite items</p>
            </div>
            <div className={style.left}>
                <div className={style.div3}>
                    <span><FiSearch/></span>
                    <input type="text"placeholder="Search Products..." onChange={(e)=>{setSearch(e.target.value)}}/>
                </div>
            </div>
        </div>
         <AllCards page={page} search={search}/>
        <div className={style.page}>
           {search.trim() === ''?  <div className={style.pages}>
                <span onClick={()=>setPage(1)} style={page=== 1? {backgroundColor:`rgb(20, 20, 85)`,color:'white'}: {backgroundColor:'white'}}>1</span>
                <span onClick={()=>setPage(2)} style={page=== 2? {backgroundColor:`rgb(20, 20, 85)`,color:'white'}: {backgroundColor:'white'}}>2</span>
                <span onClick={()=>setPage(3)} style={page=== 3? {backgroundColor:`rgb(20, 20, 85)`,color:'white'}: {backgroundColor:'white'}}>3</span>
                <span onClick={()=>setPage(4)} style={page=== 4? {backgroundColor:`rgb(20, 20, 85)`,color:'white'}: {backgroundColor:'white'}}>4</span>
                <span onClick={()=>setPage(5)} style={page=== 5? {backgroundColor:`rgb(20, 20, 85)`,color:'white'}: {backgroundColor:'white'}}>5</span>
            </div>:
            null}
        </div>
    </div>
    </>
)
}