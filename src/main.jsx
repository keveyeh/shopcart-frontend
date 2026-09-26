import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import CartProvider from './contextApi/CartContext.jsx'
import ProductProvider from './contextApi/productContext.jsx'
import UserProvider from './contextApi/UserLogin.jsx'
import CurrencyProvider from './contextApi/currencyapi.jsx'
createRoot(document.getElementById('root')).render(
    <CurrencyProvider>
      <UserProvider>
      <CartProvider>
    <ProductProvider>
      <StrictMode>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </StrictMode>,
    </ProductProvider>
  </CartProvider>
    </UserProvider>
    </CurrencyProvider>
)
