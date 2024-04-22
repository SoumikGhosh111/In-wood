import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQty, decrementQty } from '../../redux/slices/cartSlice';
import "./MobAddToCart.css";

function MobAddToCart({ isClicked }) {
  const cartItems = useSelector((state) => state.cart.cart);
  const totalPrice = cartItems.reduce((total, item) => total + item.qty * item.price, 0); 
  const dispatch = useDispatch(); 
  console.log(cartItems)
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
      <div onClick={() => setOpen(true)} className='mob-view-cart-button-wrapper'><div className='mob-view-cart-button'>Total ${totalPrice}</div></div>
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
              <span className='amnt'>${totalPrice}</span>
            </div>
            {cartItems.map((item) => (
              <div className='mob-view-add-to-cart-items'>
                <span className='pizza-name'>{item.name}</span>
                <div className='quantiy-button'>
                  <button className='quantiy-button-inner-items quantiy-button-inner-items-button plus' onClick={() => dispatch(incrementQty({id: item.id}))}>+</button>
                  <div className='quantiy-button-inner-items'>{item.qty}</div>
                  <button className='quantiy-button-inner-items quantiy-button-inner-items-button minus' onClick={() => dispatch(decrementQty({id: item.id}))}>-</button>
                </div>
              </div>
            ))}
            <button className='mob-view-pay-button' onClick={() => setOpen(false)}>Pay</button>
          </div>
          {/* <SwitchModes /> */}
        </div>
      </Drawer>
    </div>
  );
}

export default MobAddToCart;



{/* */ }