import React from 'react'; 
import "./Navbar.css"

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='nav-bar-wrapper'>
        <div className='nav-bar'>
            <div className='nav-bar-inner'>
                <ul>
                    <li><Link to={"/"} className='nav-links'>Home</Link></li>
                    <li><Link  className='nav-links'>Menu</Link></li>
                    <li><Link  className='nav-links'>Pages</Link></li>
                </ul>

                <div className='nav-bar-login-area'>
                    <span><Link to={"/login"} className='nav-links'>Login</Link></span>
                    <span>Cart</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar