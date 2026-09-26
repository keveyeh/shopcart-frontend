//import Count from "./pages/count/count.jsx"
//import Clock from "./pages/DigitalClock/Clock"
//import Accordion from "./pages/Accordion/accordion"
//import Calculator from "./pages/calculator/calculator.jsx"
//import NavBar from "./pages/Accordion/navs"
import { Routes,Route } from "react-router-dom"
import Account from "./pages/CreateAccountPage/createAccount"
import Login from "./pages/login/login"
import Product from "./pages/product/product"
import Cart from "./pages/cart/cart"
import Transaction from "./pages/transaction/transaction"
import ProtectedTransaction from "./ProtectedRoute/ProtectedTransaction"
//import Nav from "./pages/todolist/nav"
//import { useState } from "react"
//import Active from "./pages/todolist/active"
//import Completed from "./pages/todolist/completed"
//import All from "./pages/todolist/todolist"
//import ProtectedRoute from "./protectedRoute/protectedroute"
function App() {
 {/*const [search,setSearch] = useState('')
 const [ toggle,setToggle] = useState(false) */}
  return (
    <>
    <Routes>
       <Route element={<Account/>} path="/createAccount"/>
       <Route element={<Login/>} path="/login"/>
       <Route element={<Product/>} path='/'/>
       <Route element={<Cart/>} path='/cart'/>
       <Route element={<ProtectedTransaction>
        <Transaction/>
       </ProtectedTransaction>} path='/transaction'/>
    </Routes>
    {/*<Account/>
    {/*<Nav/>
    <Routes>
      <Route element={<All/>} path="/all"/>
   <Route element={<Active/>} path="/active"/>
   <Route element={
    <Completed/>} path="/complete"/>
  *}
    </Routes>
  {/*<NavBar search={search} setSearch={setSearch} toggle={toggle} setToggle={setToggle}/>
     <Accordion search={search} toggle={toggle}/> */}
     </>
  )
}

export default App
