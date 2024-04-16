import React, { useState, useEffect } from 'react';
import "./Navbar.css"
import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import TemporaryDrawer from './Drawer';

function Navbar() {
    const location = useLocation();
    const [scroll, setScroll] = useState(0);
    const [isMenuActive, setMenuIsActive] = useState(false); 

    // scroll up-down animations
    useEffect(() => {
        const body = document.body;
        let lastScroll = 0;

        window.addEventListener("scroll", () => {
            const currentScroll = window.pageYOffset;
            if (currentScroll <= 0) {
                body.classList.remove("scroll-up");
                return;
            }

            if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
                body.classList.remove("scroll-up");
                body.classList.add("scroll-down");
            } else if (
                currentScroll < lastScroll &&
                body.classList.contains("scroll-down")
            ) {
                body.classList.remove("scroll-down");
                body.classList.add("scroll-up");
            }
            lastScroll = currentScroll;
        });

    }, [])


    //determining the scroll height 
    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    useEffect(() => { 
        setMenuIsActive(scroll > window.innerHeight); 
    }, [scroll]);


    
   const handleMenu = () => { 
    const scrollPosition = window.innerHeight * 1.1; // 110% of the viewport height

        // Scroll to the calculated position
        window.scrollTo({
            top: scrollPosition,
            behavior: 'smooth' 
        }); 
   }
   const handleHomeClick = () => { 
    window.scrollTo({
        top: 0,
        behavior: 'smooth' 
    }); 
   }
    if (location.pathname === '/login') {
        return null;
    }



    return (
        <div className='nav-bar-wrapper' style={{WebkitBackdropFilter: scroll > 200 ?"blur(10px)" : "", backdropFilter : scroll > 200 ? "blur(10px)" : "", color: scroll > window.innerHeight ? "black" : ""}}>
            <div className='nav-bar'>
                <div className='nav-bar-inner'>
                    <ul>
                        <li><Link onClick={handleHomeClick} className={`nav-links ${isMenuActive ? '' : 'active'}`} id='home'>Home</Link></li>
                        <li><Link onClick={handleMenu} className={`nav-links ${isMenuActive ? 'active' : ''}`} id='menu'>Menu</Link></li>
                        <li><Link className='nav-links' id='pages'>Pages</Link></li>
                    </ul>

                    <div className='nav-bar-login-area'>
                        <span><Link to={"/login"} className='nav-links'>Login</Link></span>
                        <span className='cart-icon'><BusinessCenterRoundedIcon sx={{ transform: "translateY(15%)", color: scroll > window.innerHeight ? "black" : "" }} /></span>
                    </div>
                </div>
            </div>
            <div className='mob-view-nav'><TemporaryDrawer /></div>
        </div>
    )
}

export default Navbar