import React, { useState, useEffect } from 'react';
import "./CheckoutPageLeftSide.css";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import BasicSwitches from '../../components/Switch/Switch';
import DeleteIcon from '@mui/icons-material/Delete';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';
import { setUserData } from '../../redux/slices/userDataSlice';


// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CheckoutPageLeftSide({ onEdtBtnClick }) {
  const cartItems = useSelector((state) => state.cart.cart);
  const userDetails = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  // const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  // const [city, setCity] = useState('');
  // const [state, setState] = useState('');
  // const [country, setCountry] = useState('')
  // const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [isEligble, setEligible] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("userEmail") || '')
  const useremail = localStorage.getItem("userEmail");


  const handleBackEvent = () => {
    window.location.href = '/';

    // Clearing the browser's history
    window.history.replaceState(null, '', '/');
  }



  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/users/userDetails/${useremail}`);
      const result = await response.json();
      console.log(result);
      if (result && result.data && result.data.user) {
        setUserId(result.data.user._id);
        // setUserName(result.data.user.name); 
        // if (result.data.user.hasOwnProperty("city")) {
        //   setCity(result.data.user.city);
        // }
        // if (result.data.user.hasOwnProperty("country")) {
        //   setCountry(result.data.user.country);
        // }
        // if (result.data.user.hasOwnProperty("state")) {
        //   setState(result.data.user.state);
        // }
        // if (result.data.user.hasOwnProperty("street")) {
        //   setStreet(result.data.user.street);
        // }
        if (result.data.user.hasOwnProperty("zipCode")) {
          setZipCode(result.data.user.zipCode);
        }
      }
      const userDataObj = {
        userId: userId,
        // name: userName, 
        // email: email, 
        // city: city, 
        // stateLocation: state, 
        // country: country, 
        // street: street
        zipCode: zipCode
      }
      dispatch(setUserData(userDataObj));

    } catch (err) {
      console.log(err);
    }
  };


  const handleSaveInfo = () => {
    const userDataObj = {
      userId: userId,
      // name: userName, 
      // email: email, 
      // city: city, 
      // stateLocation: state, 
      // country: country, 
      // street: street
      zipCode: zipCode
    }

    const zip = parseInt(zipCode); // Convert to integer for numeric comparison

    // Check if the zipcode is within the range of 10034-10040
    if (zip >= 10034 && zip <= 10040) {
      setEligible(true);
      console.log(zip)
    } else {
      setEligible(false);
      alert("No delivery in your area")
    }

    dispatch(setUserData(userDataObj));
    toast.success("Info Saved");

    // console.log("This is checkout user Info", userDataObj);

    
  }


  return (
    <div className='check-out-left-side'>
      <h4>CHECKOUT</h4>
      <h2>INWOOD PIZZA</h2>
      {/* <ToastContainer /> */}

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
              <button onClick={handleBackEvent} className='back-tio-menu-btn'>Go to Home</button>
            </>)}

        </div>
      </div>


      <div className='vertical-line'></div>

      <div className='contact-info-wrapper'>
        <h4>ADDRESS</h4>
        <div className='contact-input-filed'>
          {/* <div className='first-last-name'>
            <div className='first-name'>
              <label htmlFor='first-name'>Name</label><br />
              <input name='first-name' value={userName} placeholder='First name' required onChange={(e) => setUserName(e.target.value)} />
            </div>

            <div className='last-name'>
              <label htmlFor='last-name'>Email Address</label><br />
              <input name='last-name' value={email} placeholder='Last name' required onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div> */}
          {/* <div className='first-last-name'>
            <div className='first-name'>
              <label htmlFor='email-address'>City</label><br />
              <input name='email-address' value={city} placeholder='Email address' required onChange={(e) => setCity(e.target.value)} />
            </div>

            <div className='last-name'>
              <label htmlFor='mob-num'>State</label><br />
              <input name='mob-num' value={state} placeholder='Mobile phone number' required onChange={(e) => setState(e.target.value)} />
            </div>
          </div> */}
          <div className='first-last-name'>
            {/* <div className='first-name'>
              <label htmlFor='address'>Country</label><br />
              <input name='address' value={country} placeholder='Address' required onChange={(e) => setCountry(e.target.value)} />
            </div> */}

            <div className='last-name'>
              <label htmlFor='mob-num'>Zip Code</label><br />
              <input name='mob-num' value={zipCode} placeholder='Enter Zip Code' required onChange={(e) => setZipCode(e.target.value)} />
            </div>
          </div>
          <button className='check-out-page-save-info' onClick={handleSaveInfo}>Save Info</button>
          {/* <BasicSwitches />
          <span>By checking the box, you agree to receive occasional automated promotional text messages from Slice at the cell number used when signing up. Consent is not a condition of any purchase. Reply HELP for help and STOP to cancel. Msg frequency varies. Msg & data rates may apply. Privacy & SMS Terms</span> */}
        </div>

      </div>

      <div className='vertical-line'></div>
      <div className='delivery-stts' style={{ display: isEligble ? 'block' : 'none' }}>
        <div className='if-home-delivery'>
          <input type='radio' name='delivery' />Pick Up
          <input type='radio' name='delivery' />Home Delivery
          <button>Save Info</button>
          <p style={{ display: isEligble ? 'none' : 'block' }}>Sorry Delivery not Available in your Area</p>
        </div>

      </div>

      {/* <div className='payment-info'>
        <h4>PAYMENT</h4>
      </div> */}


      {/* <div className='vertical-line'></div> */}

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
      {/*  */}
    </div>
  )
}

export default CheckoutPageLeftSide