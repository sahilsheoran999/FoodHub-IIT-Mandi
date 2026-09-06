import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import NotFound from './Pages/NotFound'
import Denied from './Pages/Denied'
import AddProduct from './Pages/Admin/Addproduct'
import AdminOrders from './Pages/Admin/AdminOrders'
import ProductDetails from './Pages/Products/ProductDetails'
import CartDetails from './Pages/Cart/CartDetails'
import Order from './Pages/Order/Order'
import OrderSuccess from './Pages/Order/OrderSuccess'
import OrderHistory from './Pages/Order/OrderHistory'
import RequireAuth from './Components/Auth/RequireAuth'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/denied" element={<Denied />} />
        <Route path='/auth/signup' element={<Signup />} />
        <Route path='/auth/login' element={<Login />} />


        <Route element={<RequireAuth />}>
          <Route path='/order' element={<Order />} />
          <Route path='/order/success' element={<OrderSuccess />} />
          <Route path='/orders' element={<OrderHistory />} />
          <Route path='/cart' element={<CartDetails />} />
        </Route>
        
        {/* Protected Admin Routes */}
        <Route element={<RequireAuth requiredRole="ADMIN" />}>
          <Route path='/admin/addProduct' element={<AddProduct />} />
          <Route path='/admin/orders' element={<AdminOrders />} />
        </Route>

        <Route path='/product/:productId' element={<ProductDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
