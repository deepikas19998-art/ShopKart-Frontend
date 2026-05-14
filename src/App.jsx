import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import Navbar  from './components/Navbar.jsx';
import Footer  from './components/Footer.jsx';
import Toast   from './components/Toast.jsx';
import Home     from './pages/Home.jsx';
import Products from './pages/Products.jsx';
import Cart     from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Login    from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Admin    from './pages/Admin.jsx';


const Protected = ({ children }) => {
  const { isLoggedIn } = useShop();
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function AppInner() {
  return (
    <div className="app-shell">
      <Navbar />
      <Toast />
      <Routes>
        <Route path="/"         element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart"     element={<Cart />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Protected><Checkout /></Protected>} />
        <Route path="/admin"    element={<Protected><Admin /></Protected>} />
        <Route path="*"         element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ShopProvider>
      <Router>
        <AppInner />
      </Router>
    </ShopProvider>
  );
}

export default App;