import { FaShoppingBag } from "react-icons/fa";
import { FiChevronDown, FiChevronUp,FiShoppingCart, FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import style from './navbar.module.css'
import { useContext, useState } from "react";
import { CartContext } from "../../contextApi/CartContext";
import { UserInfo } from "../../contextApi/UserLogin";
import { BiPackage } from "react-icons/bi";
import { RiExchangeDollarLine } from "react-icons/ri";
import { currency } from "../../contextApi/currencyapi";
export default function Navbar(){
    const [showsetting,setshowSetting]=useState(false)
    const {cart} = useContext(CartContext)
    const {authUser,setActor} = useContext(UserInfo)
    const navigate = useNavigate()
    const {coin,setCoin}= useContext(currency)
    const [showcurrency,setshowcurrency]= useState(false)
    function getname(){
        let name;
        if(!authUser.name){
            name = ''
        }else{
            const spaceIndex = authUser.name.indexOf(" ")
        const first = `${authUser.name.slice(0,1).toUpperCase()}` + `${authUser.name.slice(1,spaceIndex)}`
        const last =  `${authUser.name.slice(spaceIndex + 1,spaceIndex + 2).toUpperCase()}` + `${authUser.name.slice(spaceIndex + 2)}`
        name = `${first} ${last}`
        }
       return name
    }
    const totalProducts =  cart.length === 0 ? 0 :cart.reduce((acc,currentValue)=>{
        return   acc + Number(currentValue.quantity)
    },0)
    return(
        <>
        <nav className={style.nav}>
            <div className={style.container}>
                <div className={style.left}>
                    <span className={style.span}><FaShoppingBag/></span>
                    <h3>Shop<span className={style.span1}>Cart</span></h3>
                </div>
                <div className={style.middle}>
                    <div className={style.navlink}>
                        <div className={style.link2}>
                            <NavLink  to='/' className={({isActive})=>
                                isActive? style.active : style.noactive
                            }> <BiPackage/> Products</NavLink>
                        </div>
                        <div className={style.link2}>
                            <NavLink to='/cart'className={({isActive})=>
                                isActive? style.active : style.noactive
                            }> <FiShoppingCart/>Cart ({totalProducts})</NavLink>
                            
                        </div>
                        <div className={style.link2}>
                           <NavLink  to='/transaction' className={({isActive})=>
                                isActive? style.active : style.noactive
                            }><RiExchangeDollarLine/>Transactions</NavLink> 
                        </div>
                        <div className={style.link2}>
                            <NavLink  to='/login' className={({isActive})=>
                                isActive? style.active : style.noactive
                            }><FiUser/>Login</NavLink>
                        </div>
                    </div>
                </div>
                   {
                    authUser.isLogin?
                     <div className={style.right}>
                        <div className={style.div1}>
                         <div className={style.div2}>
                             <span className={style.span6}>{ authUser.name? authUser.name.slice(0,1).toUpperCase(): 'K'}</span>
                             <p>{getname()}</p>
                             <span onClick={()=>setshowSetting(!showsetting)} className={style.span0}>{showsetting?<FiChevronUp/>:<FiChevronDown/>}</span>
                               <div className={showsetting ? style.btn4 : style.btn3}>
                                <button className={style.btn} onClick={()=>{setshowSetting(false)
                                    setshowcurrency(true)
                                }}>Currency</button>
                                <button className={style.btn1} onClick={()=>{
                                        setActor(null)
                                        localStorage.removeItem('userInfo')
                                        navigate("/login",{replace:true})
                                }}>Logout</button>
                            </div>
                         </div>
                           
                        </div>
                        
                    </div>
                    : <div></div>
                   }
            </div>
            <div className={ showcurrency?style.currency:style.currencys}>
                <div>
                    <select value={coin} onChange={(e)=>{
                        setCoin(e.target.value)
                        setTimeout(()=>{
                          setshowcurrency(false)
                        },3000)
                        
                    }}>
                        <option value='FCFA'>FCFA</option>
                        <option value='USD'>USD</option>
                        <option value='EUR'>EUR</option>
                    </select>
                </div>
            </div>
        </nav>
        </>
    )
}