import React, {useState} from 'react';
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
import PrivateRoute from './protected-routes/PrivateRoutes';

// importing react router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import ProtectedRoute from './protected-routes/PrivateRoutes';

function App() {


  return (
    <div >
      <Router>
        <Navbar />
        <Routes>
          <Route  path='/' element={<HomePage />}/>
          <Route path='/login' element ={<LoginPage />}/>
          <Route path='/otppage' element ={<OtpPage />}/>
          <Route path='/register' element ={<SignupPage />}/>
          <Route path='/checkout' element ={<ProtectedRoute><CheckOutPage /></ProtectedRoute>}/>
          <Route path='/profile' element ={<ProfilePage />}/>
          <Route path='/forgetpassword' element ={<ForgetPasswordPage />}/>
          <Route path='/dashboard' element ={<DashboardPage />}/>
          <Route path='/checkout-success' element ={<CheckoutSuccess />}/>
        </Routes>
          
      </Router>
    </div>
  );
}

export default App;
