import style from './navbar.module.css'
import { BiLogoReact } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
function Navbar(){
   
return (
    <>
<nav className={style.nav}>
    <NavLink to='/' className={style.links}>
        <span className={style.span1}>
            <BiLogoReact className={style.bilo}></BiLogoReact>
        
        </span>
        <span> React Router</span>
    </NavLink>
    <div className={style.div}>
       <NavLink to='/' className={({isActive})=>{
          return   isActive ? style.active : style.link    }} >
       Home
    </NavLink>
    <NavLink to='/about' className={({isActive})=>{
          return   isActive ? style.active : style.link    }}  >
       About
    </NavLink>
    <NavLink to='/contact' className={({isActive})=>{
          return   isActive ? style.active : style.link    }} >
        Contact
    </NavLink>
    <NavLink to='/products' className={({isActive})=>{
          return   isActive ? style.active : style.link    }} >
        Products
    </NavLink> 
    </div>
</nav>
</>


)
}
export default Navbar