import React, { useState, useEffect } from 'react';
import "./Navbar.css"
import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import TemporaryDrawer from './Drawer';
import { getUser } from '../../functions/veifyUser';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
    const location = useLocation();
    const [scroll, setScroll] = useState(0);
    const [isMenuActive, setMenuIsActive] = useState(false);
    const [showAvater, setShowAvater] = useState(false);
    const [showDropdown, setShowDropDown] = useState(false); 



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
        setMenuIsActive(scroll > 300);
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

    // const verifyUser = async () => {
    //     const isValid = await getUser();
    //     setShowAvater(isValid);
    // }
    // useEffect(() => {
    //     verifyUser();
    // }, []); 

    useEffect(() => {
        const checkUser = async () => {
            const isValid = await getUser();
            setShowAvater(isValid);

        };
        checkUser();
    }, [localStorage.getItem("token")]);



    const toggleDropDownMenu = () =>{ 
        setShowDropDown(!showDropdown); 
    }

    const handleLogout = () => { 
        setShowAvater(false);  
        localStorage.removeItem("token");
    }

    if (location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/otppage' || location.pathname === '/checkout' || location.pathname === '/forgetpassword' || location.pathname === '/checkout' || location.pathname === '/profile') {
        return null;
    }; 



    return (
        <div className='nav-bar-wrapper' style={{ WebkitBackdropFilter: scroll > 200 ? "blur(10px)" : "", backdropFilter: scroll > 200 ? "blur(10px)" : "", color: scroll > window.innerHeight ? "black" : "" }}>
            <div className='nav-bar'>
                <div className='nav-bar-inner'>
                    <ul>
                        <li><Link onClick={handleHomeClick} className={`nav-links ${isMenuActive ? '' : 'active'}`} id='home'>Home</Link></li>
                        <li><Link onClick={handleMenu} className={`nav-links ${isMenuActive ? 'active' : ''}`} id='menu'>Menu</Link></li>
                        <li><Link className='nav-links' id='pages'>Pages</Link></li>
                    </ul>

                    <div className='nav-bar-login-area'>
                        {showAvater ? 
                            <span className='avater'>
                                <AccountCircleIcon sx={{transform: 'translateY(25%)', cursor: "pointer"}}  onClick = {toggleDropDownMenu}/>
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link to="/profile" className='nav-links'>My profile</Link>
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link to={"/checkout"} className='nav-links'>My orders</Link>
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link onClick={handleLogout} className='nav-links'>Logout</Link>
                                    </div>
                                )}
                            </span> 
                            : 
                            <><span>
                                <Link to={"/login"} className='nav-links'>Login</Link>/<Link to={"/register"} className='nav-links'>Sign up</Link>
                            </span></>
                        }

                        <span className='cart-icon' onClick={handleMenu}><BusinessCenterRoundedIcon sx={{ transform: "translateY(15%)", color: scroll > window.innerHeight ? "black" : "" }} /></span>
                    </div>
                </div>
            </div>
            <div className='mob-view-nav'><TemporaryDrawer /></div>
        </div>
    )
}

export default Navbar