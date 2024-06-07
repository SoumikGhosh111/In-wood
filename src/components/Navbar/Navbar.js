import React, { useState, useEffect } from 'react';
import "./Navbar.css"
import { useLocation } from "react-router-dom"

import { Link } from 'react-router-dom';
import BusinessCenterRoundedIcon from '@mui/icons-material/BusinessCenterRounded';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LoginIcon from '@mui/icons-material/Login';
import TemporaryDrawer from './Drawer';
import { getUser } from '../../functions/veifyUser';
import { verifyAdmin } from '../../functions/verifyAdmin';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import logo from "../../assets/inwood_logo_transparent.png";
import { baseUrl } from '../../functions/baseUrl';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Navbar() {
    const location = useLocation();
    const [scroll, setScroll] = useState(0);
    const [isMenuActive, setMenuIsActive] = useState(false);
    const [showAvater, setShowAvater] = useState(false);
    const [showDropdown, setShowDropDown] = useState(false);
    const [profilePic, setProfilePic] = useState(null);
    const [isAdmin, setIsadmin] = useState(false);
    const [popup, setPopUp] = useState(null);
    const useremail = localStorage.getItem("userEmail");
    const token = localStorage.getItem("token");


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
        const scrollPosition = window.innerHeight * 1; // 100% of the viewport height

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
            if (isValid) {

            }
        };

        // checkAdmin(); 
        checkUser();
        fetchUserDetails();
    }, [localStorage.getItem("token"), localStorage.getItem("userEmail")]);



    const fetchUserDetails = async () => {
        try {
            const response = await fetch(`${baseUrl}/api/users/userDetails/${useremail}`);
            const result = await response.json();
            // console.log(result);
            // if (result && result.data && result.data.user) {

            // }
            if (result.data.user.profileImg) {
                setProfilePic(result.data.user.profileImg);
            }
            setIsadmin(result.data.user.role === "admin");
        } catch (err) {
            console.log(err);
        }
    }
    // const checkAdmin = async() => { 
    //     const admin  = await verifyAdmin(); 
    //     setIsadmin(admin); 
    // }



    const toggleDropDownMenu = () => {
        setShowDropDown(!showDropdown);
    }

    const handleLogout = () => {
        setShowAvater(false);
        setShowDropDown(false);
        setProfilePic(null)
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
    }

    // if (location.pathname === '/login' || 
    // location.pathname === '/register' || 
    // location.pathname === '/otppage' || 
    // location.pathname === '/checkout' || 
    // location.pathname === '/forgetpassword' || 
    // location.pathname === '/checkout' || 
    // location.pathname === '/profile' || 
    // location.pathname === '/dashboard' || 
    //  location.pathname === '/checkout-success' ||
    // location.pathname === '*' ) 
    // {
    //     return null;
    // }; 
    useEffect(() => {
        fetchStoreOpenCloseData();
    }, []);

    const fetchStoreOpenCloseData = async () => {

        try {
            const response = await fetch(`${baseUrl}/api/store/storeStatus`);
            const result = await response.json();

            //   if(result.status === 'close'){ 
            //     toast.error('Oops Store is closed'); 
            //   }

            // console.log(result.status); 
            setPopUp(result.status === 'open');
        
            // console.log(popup); 
        }
        catch (err) {
            console.log(err)
        }

    }
    if (location.pathname !== '/') {
        return null;
    }

    const styleMobView = {
        WebkitBackdropFilter: scroll > 200 ? 'blur(10px)' : '',
        backdropFilter: scroll > 200 ? 'blur(10px)' : '',
        color: scroll > window.innerHeight ? 'black' : '',
        boxShadow: scroll > window.innerHeight ? '0px 0px 14px 0px rgb(182, 182, 182)' : 'none',
    };





    return (
        <div className='nav-bar-wrapper' style={{ WebkitBackdropFilter: scroll > 200 ? "blur(10px)" : "", backdropFilter: scroll > 200 ? "blur(10px)" : "", color: scroll > window.innerHeight ? "black" : "", boxShadow: scroll > window.innerHeight ? '0px 0px 14px 0px rgb(182, 182, 182)' : 'none' }}>
            <div className='nav-bar'>
                <div className='nav-bar-inner'>
                    <ul>
                        <li><img src={logo} style={{ width: '50px', height: 'auto' }} alt='logo image' /></li>
                        <li><Link onClick={handleHomeClick} className={`nav-links btn-2 ${isMenuActive ? '' : 'active'}`} id='home'>Home</Link></li>
                        <li><Link onClick={handleMenu} className={`nav-links btn-2 ${isMenuActive ? 'active' : ''}`} id='menu'>Menu</Link></li>
                        <li><Link className='nav-links btn-2' id='pages' to={"/checkout"}>Checkout</Link></li>
                        {/* <li><Link className='nav-links btn-2' id='pages' to={"/promotion"}>Promotion</Link></li> */}
                    </ul>

                    <div className='nav-bar-login-area'>
                        {/* <div>We are Close at 11.00am</div> */}
                        {showAvater ?
                            <span className='avater'>
                                {profilePic !== null ? (
                                    <div className='profile-image-nav-bar' onClick={toggleDropDownMenu}><img src={profilePic} /></div>
                                ) : (
                                    <>
                                        {popup !== null ? <>
                                            {popup ? 
                                            <>
                                                <span className= 'store-op-cl' style={{color: '#71b422'}}>we are Open now</span>    
                                            </> : 
                                            <>
                                                <span className= 'store-op-cl' style={{color: '#e92028'}}>we are Close now</span> 
                                            </>}
                                        </> : <></> }
                                    
                                    <AccountCircleIcon sx={{ transform: 'translateY(25%)', cursor: "pointer" }} onClick={toggleDropDownMenu} />
                                    </>
                                )}
                                {showDropdown && (
                                    <div className="dropdown-content">
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link to="/profile" className='nav-links' onClick={() => setShowDropDown(false)}>My profile</Link>
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link to={"/my-order"} className='nav-links' onClick={() => setShowDropDown(false)}>My orders</Link>
                                        <Link to={"/dashboard"} className='nav-links' onClick={() => setShowDropDown(false)} style={{ display: isAdmin ? "block" : "none" }}>Dashboard</Link>
                                        {/* <div className='nav-ver-line'></div> */}
                                        <Link onClick={handleLogout} className='nav-links'>  Logout  <LogoutRoundedIcon sx={{transform: 'translateY(30%)'}}/></Link>
                                    </div>
                                )}
                            </span>
                            :
                            <><span>
                                <Link to={"/login"} className='nav-links' > <LoginIcon sx={{ transform: 'translateY(30%)' }} /> Login</Link>&nbsp;&nbsp;&nbsp;&nbsp;<Link to={"/register"} className='nav-links'> <ExitToAppRoundedIcon sx={{ transform: 'translateY(30%)' }} /> Sign up</Link>
                            </span></>
                        }

                        <span className='cart-icon' onClick={handleMenu}><ShoppingCartOutlinedIcon sx={{ transform: "translateY(15%)", color: scroll > window.innerHeight ? "black" : "" }} /></span>
                    </div>
                </div>
            </div>
            <div className='mob-view-nav' style={{ backgroundColor: scroll > window.innerHeight ? '#e7e7e7' : '' }}><TemporaryDrawer /></div>

            {/* <ToastContainer /> */}
        </div>
    )
}

export default Navbar;

{/* <span className= 'store-op-cl' >we are </span> */}