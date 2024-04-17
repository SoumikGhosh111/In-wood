import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { IconButton } from '@mui/material';
import { Switch } from '@mui/material';
import zIndex from '@mui/material/styles/zIndex';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import "./MobAddToCart.css";

function MobAddToCart({isClicked}) {
  let [isOpen, setOpen] = useState(isClicked);
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
    <div className='mob-view-add-to-cart-wrapper'>
      {/* <input placeholder='Search' style={{ opacity: scroll > window.innerHeight * 0.5 ? "1" : "0" }} /> */}
      <IconButton onClick={() => setOpen(true)} sx={{width: "100%"}}><div className='mob-view-cart-button'>Total $12.67</div></IconButton>
      <Drawer
        anchor={"bottom"}
        open={isOpen}
        onClose={() => setOpen(false)}
        sx={{ zIndex: "999", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
      >
        <div className='mob-view-add-to-cart-div'>
          <div className='mob-view-add-to-cart-items-wrapper'>
            <div className='mob-view-add-to-cart-items'>
              <span className='total'>Total</span>
              <span className='amnt'>$12.67</span>
            </div>
            <div className='mob-view-add-to-cart-items'>
              <span className = 'pizza-name'>Pepparoni Pizza </span>
              <div></div>
            </div>
            <button className='mob-view-pay-button' onClick={() => setOpen(false)}>Pay</button>
          </div>
          {/* <SwitchModes /> */}
        </div>
      </Drawer>
    </div>
  );
}

export default MobAddToCart