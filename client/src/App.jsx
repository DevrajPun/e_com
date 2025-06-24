
import './App.css'
import './index.css'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Pagenotfound from './pages/Pagenotfound';
import Policy from './pages/Policy';
import ContactPage from './pages/ContactPage';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import ForgotPasssword from './pages/Auth/ForgatePassword';
import ResetPassword from './pages/Auth/ResetPass';
import VerifyOtp from './pages/Auth/VerifyOtp';
import Logout from './pages/Auth/Logout';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './components/routes/Private';
import AdminRoute from './components/routes/Admin';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Order from './pages/user/Order';
import Profile from './pages/user/Profile';
import Products from './pages/admin/Product';
import UpdateProduct from './pages/admin/UpdateProduct';
import ProductDetails from './pages/ProductDetails';
import Categories from './pages/Categories';
import CategoryProduct from './pages/CategoryProduct';
import CartPage from './pages/CartPage';
import AdminOrders from './pages/admin/AdminOrder';

function App() {
  return (
    <>
      <Routes>
        < Route path='/' element={< HomePage />} />
         < Route path='/product/:id' element={< ProductDetails />} />
         <Route path="/categories" element={<Categories />} />
         <Route path="/cart" element={<CartPage />} />
         <Route path="/category/:id" element={<CategoryProduct />} />
        < Route path='/register' element={< Register />} />
        < Route path='/login' element={< Login />} />

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
           <Route path='user/orders' element={<Order />} />
            <Route path='user/profile' element={<Profile />} />
        </Route>

         <Route path="/dashboard" element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-products' element={<CreateProduct/>} />
          <Route path='admin/orders' element={<AdminOrders/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/products/:id' element={<UpdateProduct/>} />
          <Route path='admin/users' element={<Users/>} />
        </Route>
  

        < Route path='/forgot-password' element={< ForgotPasssword />} />
        < Route path='/reset' element={< ResetPassword />} />
        < Route path='/verify-otp' element={<VerifyOtp />} />
        < Route path='/logout' element={< Logout />} />


        < Route path='/about' element={< AboutPage />} />
        < Route path='/contact' element={< ContactPage />} />
        < Route path='/policy' element={< Policy />} />
        < Route path='/*' element={< Pagenotfound />} />

      </Routes>


    </>
  )
}




export default App
