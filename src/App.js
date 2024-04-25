import React, {useState} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import OtpPage from './pages/OtpPage';
import SignupPage from './pages/SignupPage';
import CheckOutPage from './pages/CheckOutPage';

// importing react router dom
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  const [isClicked, setIsClicked] = useState(false); 

  const handleButtonClick = () => { 
    setIsClicked(true); 
  }
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
