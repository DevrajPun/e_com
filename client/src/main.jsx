import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter} from 'react-router-dom';
import { AuthProvider } from './context/auth.jsx';
import { CartProvider } from './context/Cart.jsx';
import './index.css'
import App from './App.jsx'
import "antd/dist/reset.css";
import { GiCarDoor } from 'react-icons/gi';

createRoot(document.getElementById('root')).render(
 
  <BrowserRouter>
  <CartProvider >
    <AuthProvider>
      <App />
    </AuthProvider>
    </CartProvider>
  </BrowserRouter>
 
)
