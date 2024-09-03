import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import SignupPage from './pages/SignupPage';
import CheckOutPage from './pages/CheckOutPage';
import ForgetPasswordPage from './pages/ForgetPasswordPage';
import ProfilePage from './pages/ProfilePage';
import DashboardPage from './pages/DashboardPage';
import CheckoutSuccess from './checkout-components/CheckoutSuccess/CheckoutSuccess';
import NotFound from './components/NotFound/NotFound';
import { UserProvider } from './functions/useUserContext';
import MyOrderPage from './pages/MyOrderPage';
import PromotionsPage from './pages/PromotionsPage';
import SpecialOffersPage from './pages/SpecialOffersPage';


// importing react router dom
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProtectedRoute from './protected-routes/PrivateRoutes';
import AdminRoute from './protected-routes/AdminRoute';
import Popup from './components/Popup/Popup';

function App() {


  return (
    <div >
      {/* <Router> */}
        <Navbar />
        <Popup />
        <UserProvider>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/otppage' element={<OtpPage />} />
            <Route path='/register' element={<SignupPage />} />
            <Route path='/checkout' element={<ProtectedRoute><CheckOutPage /></ProtectedRoute>} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path='/forgetpassword' element={<ForgetPasswordPage />} />
            <Route path='/dashboard' element={<AdminRoute><DashboardPage /></AdminRoute>} />
            <Route path='/checkout-success' element={<CheckoutSuccess />} />
            <Route path='/my-order' element={<ProtectedRoute><MyOrderPage /></ProtectedRoute>} />
            <Route path='/coupens' element={<ProtectedRoute><PromotionsPage /></ProtectedRoute>} />
            <Route path='/special-offers' element={<ProtectedRoute><SpecialOffersPage /></ProtectedRoute>} />
            <Route path="*"  element={<NotFound />} />
            
          </Routes>
        </UserProvider>
        {/* <Footer /> */}
      {/* </Router> */}
    </div>
  );
}

export default App;
