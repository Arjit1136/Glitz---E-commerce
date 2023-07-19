
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './scenes/LoginPage/'
// import { Navbar } from './scenes/Navbar/Navbar'
import { HomePage } from './scenes/HomePage'

import { ProductPage } from './scenes/ProductPage/ProductPage'
import { Wishlist } from './scenes/Wishlist'
import { Cart } from './scenes/Cart'
import { Orders } from './scenes/Orders'
import { LoadingComponent } from './components/Loader'
function App() {

  return (
    <div >
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user" element={<LoginPage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/user/wishlist" element={<Wishlist />} />
          <Route path="/user/cart/:id" element={<Cart />} />
          <Route path="/user/orders/:id" element={<Orders />} />
          <Route path="/test" element={<LoadingComponent isLoading={true}/>} />
          
        </Routes>
      </div>
    </div>
  )
}

export default App
