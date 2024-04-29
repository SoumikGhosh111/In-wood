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

// importing react router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

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
          <Route path='/checkout' element ={<CheckOutPage />}/>
          <Route path='/profile' element ={<ProfilePage />}/>
          <Route path='/forgetpassword' element ={<ForgetPasswordPage />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
