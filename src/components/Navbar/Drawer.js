import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Switch } from '@mui/material';
import "./Navbar.css"
import zIndex from '@mui/material/styles/zIndex';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import SwitchTheme from '../SwitchTheme/SwitchTheme';

import { useDispatch } from 'react-redux';
import { toggle } from '../../redux/slices/cartShow';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../functions/veifyUser';



export default function TemporaryDrawer() {
    const dispatch = useDispatch();



    const [isOpen, setOpen] = useState(false);
    const [scroll, setScroll] = useState(0);
    const [isLogin, setIsLogin] = useState(false);

    const Navigate = useNavigate(); 

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);


    const handleCartClick = () => {
        dispatch(toggle())
    }

    const handleLogout = () => {
        setIsLogin(false); 
        localStorage.removeItem("token");
    }

    const handleLogin = () => { 
        Navigate("/login")
    }

    useEffect(() => {
        const checkUser = async () => {
            const isValid = await getUser();
            setIsLogin(isValid);

        };
        checkUser();
    }, [localStorage.getItem("token")]);


   
    return (
        <div className='drawer-wrapper'>
            {/* <input placeholder='Search' style={{ opacity: scroll > window.innerHeight * 0.5 ? "1" : "0" }} /> */}
            <IconButton onClick={() => setOpen(true)}><MenuRoundedIcon sx={{ color: scroll > window.innerHeight ? "black" : "var(--white)" }} /></IconButton>
            <Drawer
                anchor={"top"}
                open={isOpen}
                onClose={() => setOpen(false)}
                sx={{ zIndex: "999", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
            >
                <div className='drawer-div' >
                    <div className='drawer-items-wrapper'>
                        <div className='drawer-items'>
                            <a>Apply Coupons</a>
                            <EastRoundedIcon />
                        </div>
                        {/* <div className='hor-line'>Hello !</div> */}


                        <div className='drawer-items' onClick={handleCartClick}>
                            <a >Cart</a>
                            <EastRoundedIcon />
                        </div>
                        {/* <div className='hor-line'></div> */}


                        <div className='drawer-items'>
                            <a>Profile</a>
                            <EastRoundedIcon />
                        </div>
                        {/* <div className='hor-line'></div> */}

                        {isLogin ?
                            <div className='drawer-items' onClick={handleLogout}>
                                <a>Logout</a>
                                <EastRoundedIcon />
                            </div>
                            :
                            <div className='drawer-items' onClick={handleLogin}>
                                <a>Login</a>
                                <EastRoundedIcon />
                            </div>
                        }

                        {/* <div className='hor-line'></div> */}
                    </div>
                    <div className='theme-switcher'>
                        Dark Theme
                        <SwitchTheme />
                    </div>
                </div>
            </Drawer>
        </div>
    );
}