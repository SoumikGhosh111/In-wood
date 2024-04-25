import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty } from '../../redux/slices/cartSlice';
import { setFalse } from '../../redux/slices/cartShow';

import { Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../../functions/veifyUser';
import "./MobAddToCart.css";

function MobAddToCart({ isClicked }) {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0);

  const cartShow = useSelector((state) => state.show.isTrue);

  const dispatch = useDispatch();

  const Navigate = useNavigate(); 
  // console.log(cartShow)
  // console.log(cartItems)
  let [isOpen, setOpen] = useState(cartShow);
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

  useEffect(() => { 
    setOpen(cartShow); 
  }, [cartShow]); 

  const handleMobCartClose = () => { 
    setOpen(false); 
    dispatch(setFalse()); 
  }

  const handlePayBtnClick = async() => { 
    const isUser = await getUser(); 
    if(isUser){ 
      Navigate("/checkout"); 
    }else{ 
      Navigate("/login"); 
    }
  }
  return (
    <div className='mob-view-add-to-cart-wrapper'>
      {/* <input placeholder='Search' style={{ opacity: scroll > window.innerHeight * 0.5 ? "1" : "0" }} /> */}
      <div onClick={() => setOpen(true)} className='mob-view-cart-button-wrapper'><div className='mob-view-cart-button'>Total ${(totalPrice).toFixed(2)}</div></div>
      <Drawer
        anchor={"bottom"}
        open={isOpen}
        onClose={handleMobCartClose}
        sx={{ zIndex: "999", WebkitBackdropFilter: "blur(5px)", backdropFilter: "blur(5px)" }}
      >
        <div className='mob-view-add-to-cart-div'>
          <div className='mob-view-add-to-cart-items-wrapper'>
            <div className='mob-view-add-to-cart-items'>
              <span className='total'>Total</span>
              <span className='amnt'>${(totalPrice).toFixed(2)}</span>
            </div>
            {cartItems.map((item) => (
              <div className='mob-view-add-to-cart-items'>
                <span className='pizza-name'>
                  {item.name} <br />
                  {item.size &&
                    <>Size: {item.size}</>
                  }<br />
                  {item.toppings &&
                    <>Toppings: {item.toppings.map((topping) => topping.text).join(', ')}</>
                  }
                </span>
                <div className='quantiy-button'>
                  <button className='quantiy-button-inner-items quantiy-button-inner-items-button plus' onClick={() => dispatch(incrementQty({ id: item.id }))}>+</button>
                  <div className='quantiy-button-inner-items'>{item.qty}</div>
                  <button className='quantiy-button-inner-items quantiy-button-inner-items-button minus' onClick={() => dispatch(decrementQty({ id: item.id }))}>-</button>
                </div>
              </div>
            ))}
            <button className='mob-view-pay-button' onClick={handlePayBtnClick}>Pay</button>
          </div>
          {/* <SwitchModes /> */}
        </div>
      </Drawer>
    </div>
  );
}

export default MobAddToCart;



{/* */ }