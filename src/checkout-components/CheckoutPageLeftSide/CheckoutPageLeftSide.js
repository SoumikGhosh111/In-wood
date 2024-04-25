import React from 'react';
import "./CheckoutPageLeftSide.css";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import BasicSwitches from '../../components/Switch/Switch';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';

function CheckoutPageLeftSide({ onEdtBtnClick }) {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  return (
    <div className='check-out-left-side'>
      <h4>CHECKOUT</h4>
      <h2>INWOOD PIZZA</h2>


      {/* <div className='check-out-left-side-details'>
        <h4>DETAILS</h4>
        <div className='check-out-left-side-details-options'>
          <div className='aveneu'>
            <div className='avenue-inner'>
              <HomeIcon sx={{ marginRight: "1rem" }} />
              <span>
                Pick Up • Wed, Apr 24, 11:30 AM
                <br />
                <span className='avenue-address'>179 Sherman Ave New York, NY 10034</span>
              </span>
            </div>
            <button className='avenue-edt-button'>Edit</button>
          </div>
          <div className='aveneu'>
            <div className='avenue-inner'>
              <EmojiPeopleRoundedIcon sx={{ marginRight: "1rem" }} />
              <span>
                I'll come inside
                <br />
                <span className='avenue-address'>+ Pickup instructions</span>
              </span>
            </div>
            <button className='avenue-edt-button' onClick={onEdtBtnClick}>Edit</button>
          </div>
        </div>
      </div> */}

      <div className='your-items'>
        <h4 className='your-items-title'>YOUR ITEMS</h4>
        <div className='items'>
          {cartItems.length > 0 ? (<>
            {cartItems.map((item) => (
              <div className='your-item-card'>
                <div className='item-name-qty-price'>
                  <div className='item-qty-name'>
                    <span className='item-qty a'>{item.qty}X</span>
                    <span className='item-name'>
                      {item.name}
                    </span>
                  </div>
                  <DeleteIcon onClick={() => dispatch(removeFromCart({ id: item.id }))} sx={{ cursor: "pointer" }} />
                </div>
                {item.size &&
                  <div className='item-size-price'>
                    <p>{item.size}</p>
                    <p>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                }

                {item.toppings &&
                  <div className='item-topping'>
                    {item.toppings.map((toping) => (
                      <p>{toping.text}</p>
                    ))}
                  </div>
                }
              </div>
            ))}
          </>) :
            (<>
              <span>
                Your cart is empty. <br />
                Select from the menu to start an order.
              </span>
            </>)}

        </div>
      </div>


      <div className='vertical-line'></div>

      <div className='contact-info-wrapper'>
        <h4>ADDRESS</h4>
        <div className='contact-input-filed'>
          <div className='first-last-name'>
            <div className='first-name'>
              <label htmlFor='first-name'>First name</label><br />
              <input name='first-name' placeholder='First name' required />
            </div>

            <div className='last-name'>
              <label htmlFor='last-name'>Last name</label><br />
              <input name='last-name' placeholder='Last name' required />
            </div>
          </div>
          <div className='first-last-name'>
            <div className='first-name'>
              <label htmlFor='email-address'>Email address</label><br />
              <input name='email-address' placeholder='Email address' required />
            </div>

            <div className='last-name'>
              <label htmlFor='mob-num'>Mobile phone number</label><br />
              <input name='mob-num' placeholder='Mobile phone number' required />
            </div>
          </div>
          {/* <BasicSwitches />
          <span>By checking the box, you agree to receive occasional automated promotional text messages from Slice at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. Privacy & SMS Terms</span> */}
        </div>
      </div>

      <div className='vertical-line'></div>

      <div className='payment-info'>
        <h4>PAYMENT</h4>
      </div>


      <div className='vertical-line'></div>

      {/* <div className='your-items'>
        <h4 className='your-items-title'>YOUR ITEMS</h4>
        <div className='items'>
          {cartItems.length > 0 ? (<>
            {cartItems.map((item) => (
              <div className='your-item-card'>
                <div className='item-name-qty-price'>
                  <div className='item-qty-name'>
                    <span className='item-qty a'>{item.qty}X</span>
                    <span className='item-name'>
                      {item.name}
                    </span>
                  </div>
                  <DeleteIcon onClick={() => dispatch(removeFromCart({ id: item.id }))} sx={{ cursor: "pointer" }} />
                </div>
                {item.size &&
                  <div className='item-size-price'>
                    <p>{item.size}</p>
                    <p>${(item.price * item.qty).toFixed(2)}</p>
                  </div>
                }

                {item.toppings &&
                  <div className='item-topping'>
                    {item.toppings.map((toping) => (
                      <p>{toping.text}</p>
                    ))}
                  </div>
                }
              </div>
            ))}
          </>) :
            (<>
              <span>
                Your cart is empty. <br/>
                Select from the menu to start an order.
              </span>
            </>)}

        </div>
      </div> */}

    </div>
  )
}

export default CheckoutPageLeftSide