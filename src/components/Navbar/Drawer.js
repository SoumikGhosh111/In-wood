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

export default function TemporaryDrawer() {
    let [isOpen, setOpen] = useState(false);
    const [scroll, setScroll] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScroll(window.scrollY);
        }

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, []);
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


                        <div className='drawer-items'>
                            <a>Cart</a>
                            <EastRoundedIcon />
                        </div>
                        {/* <div className='hor-line'></div> */}


                        <div className='drawer-items'>
                            <a>Profile</a>
                            <EastRoundedIcon />
                        </div>
                        {/* <div className='hor-line'></div> */}


                        <div className='drawer-items'>
                            <a>Settings</a>
                            <EastRoundedIcon />
                        </div>
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