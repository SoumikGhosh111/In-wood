import React, { useState, useEffect, useId } from 'react';
import "./CheckoutPageLeftSide.css";
import HomeIcon from '@mui/icons-material/Home';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import BasicSwitches from '../../components/Switch/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { baseUrl } from '../../functions/baseUrl';

// redux
import { useDispatch, useSelector } from 'react-redux';


import { removeFromCart, incrementQty, decrementQty } from '../../redux/slices/cartSlice';
import { setUserData } from '../../redux/slices/userDataSlice';
import { addSpecialObject, deleteSpecialObject } from '../../redux/slices/specialOffersSlice';


// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function CheckoutPageLeftSide({ onEdtBtnClick, handleCoupon }) {
  const [specialOffer, setSpecialOffer] = useState(null);
  const cartItems = useSelector((state) => state.cart.cart);
  const userDetails = useSelector((state) => state.userdata);
  const specialOffersObj = useSelector(state => state.specialoffer.specialOrder);
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
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // useState for recieving coupon data 
  const [coupons, setCoupons] = useState(null);
  const [couponCode, setCouponCode] = useState('');

  const [openDropDown, setOpenDropDown] = useState(false);

  const specialOffersObjs = useSelector(state => state.specialoffer.specialOrder);
  console.log(specialOffersObjs);

  const handleBackEvent = () => {
    window.location.href = '/';

    // Clearing the browser's history
    window.history.replaceState(null, '', '/');
  }

// calculating the subtotal for coupons
  const totalSpend = cartItems.reduce((total, item) => 
    total + item.qty * item.price, 
    0
  ); 

  var existingData = {
    userId: "",
    zipCode: ""
  }
  useEffect(() => {
    getUserDetails();
  }, [])

  const getUserDetails = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/users/userDetails/${useremail}`);
      const result = await response.json();
      console.log(result, "this is result");
      if (result && result.data && result.data.user) {
        setUserId(result.data.user._id);
        existingData = {
          ...existingData,
          userId: result.data.user._id,
        }
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
          existingData = {
            ...existingData,
            zipCode: result.data.user.zipCode,
          }
        }
      }


      const userDataObj = {
        ...existingData,
      }




      console.log(existingData, "this is existing data inside obj");
      dispatch(setUserData(userDataObj));


    } catch (err) {
      console.log(err);
    }
  };

  console.log(existingData, "this is existing data");




  const handleSaveInfo = () => {
    const userDataObj = {
      // ...existingData,
      userId: userId,
      // name: userName, 
      // email: email, 
      // city: city, 
      // stateLocation: state, 
      // country: country, 
      // street: street
      zipCode: zipCode
    }

    const allowedZipCodes = ["10034", "10035", "10036", "10037", "10038", "10039", "10040"];

    // Check if the entered zip code is in the list of allowed zip codes
    if (allowedZipCodes.includes(zipCode)) {
      // Save user info if the zip code is allowed
      dispatch(setUserData(userDataObj));
      toast.success("Info Saved");
      setEligible(true); // Indicate that delivery is available
    } else {
      // Display a message indicating no delivery in the area
      toast.error("Sorry, pizza delivery is not available in your area");
      setEligible(false);
    }

  };

  useEffect(() => {
    setSpecialOffer(JSON.parse(localStorage.getItem('specialOrder')));
  }, [localStorage.getItem('specialOrder')]);

  const handleLocalStorageDelete = () => {
    localStorage.removeItem('specialOrder');
    setSpecialOffer(null);
  }

  const handleDeleteOfffer = () => {
    dispatch(deleteSpecialObject())
  }

  const toggleDropDown = () => {
    setOpenDropDown(!openDropDown);
  }



  // coupons function
  useEffect(() => {
    fetchALLCoupons();
  }, []);
  const fetchALLCoupons = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/coupon/getAllCoupon`);
      const result = await response.json();
      setCoupons(result);
    } catch (e) {
      console.log(e.message);
    }
  }


  const handleCouponClick = async (couponCode, couponId) => {
    // here need to implement useCode function 
    console.log(userId, 'this is  userId', couponCode, 'this is coupon code');
    handleCoupon({ userId, couponCode,  totalSpend});
  }

  // const handleCouponClick = (couponCode) => {
  //   if (!appliedCoupon) { // Apply coupon only if none is applied
  //     handleCoupon({ userId, couponCode, totalSpend });
  //     setAppliedCoupon(couponCode); // Set the applied coupon
  //     toast.success(`Coupon ${couponCode} applied!`);
  //   } else {
  //     toast.error('Only one coupon can be applied at a time.');
  //   }
  // };


  const handleCancelCoupon = () => {
    setAppliedCoupon(null); // Reset the applied coupon
    toast.info('Coupon has been removed.');
  };
  return (
    <div className='check-out-left-side'>
      <h4>CHECKOUT</h4>
      <h2>INWOOD PIZZA</h2>
      <button onClick={handleBackEvent} className='back-tio-menu-btn' style={{ display: cartItems?.length > 0 ? 'block' : 'none' }}>Add To Order</button>
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
      {Object.keys(specialOffersObj).length > 0 &&

        <div className='drop-down-container-wrapper'>

          <div className='drop-down-container'>
            <div className='drop-down-offer-name'>
              <div>Special Offer {specialOffersObj.offerName}</div> <div>Price: $ {specialOffersObj.totalAmount}</div> <button onClick={handleDeleteOfffer} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }} ><DeleteIcon /></button>
            </div>

            <button onClick={toggleDropDown} style={{ border: 'none', backgroundColor: 'transparent', cursor: 'pointer' }}>
              {openDropDown ? <ExpandLessRoundedIcon /> : <ExpandMoreRoundedIcon />}
            </button>
          </div>

          <div className={`dropdown-info ${openDropDown ? 'open-dropdown' : 'close-dropdown'}`}>

            {specialOffersObjs?.pizza.map((item) => (
              <div>
                <div style={{ fontWeight: '700' }}>{item.title}</div>
                {item.toppings?.map((topping) => (
                  <div>{topping}</div>
                ))}
              </div>
            ))}
            {specialOffersObjs?.addedItems?.map((item) => (
              <div style={{ fontWeight: '700' }}>
                {item}
              </div>
            ))}

            {specialOffersObjs?.extraAdded &&
              <div style={{ fontWeight: '700' }}>{specialOffersObjs.extraAdded}</div>
            }

          </div>
        </div>
      }



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
      {/* <div className='free-delivery-check-out'>Free Delivery On 20$</div> */}
      <div>

      </div>
      {/* <div className='apply-coupons'>
        <h4>APPLY COUPONS</h4>
        <div className='coupons-inner'>
              <input type='text' placeholder='Enter Coupon Code' className='coupon-code-input' value={couponCode} onChange={(e) => setCouponCode(e.target.value)}/>
            <button className='coupons-apply-button' onClick={() => handleCouponClick(couponCode)}>Apply</button>
        </div>
      </div> */}
      <div className='contact-info-wrapper'>
        <h4>APPLY COUPONS</h4>
        <div className='contact-input-filed coupons-wrapper-checkout'>
          {coupons?.map((item, indx) => (
            
            <div className='coupon-items-checkout'>
              <div className='hor-line-coupons'></div>
              <div className='coupon-code-apply-button'>
                <div>
                  <h3>{item.code}</h3>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>Use code {item.code} to get {item.discountPercentage}% off</span><br />
                  <span style={{ fontSize: '13px' }}>{item.description}</span>
                </div>
                <div className='coupon-apply-button' onClick={() => handleCouponClick(item.code)}>APPLY</div>
              </div>

            </div>
          ))}

          {/*<button  className='check-out-page-save-info' onClick={() => handleCouponClick(couponCode)}>Apply</button>*\}
          {/* <BasicSwitches />*/}
        </div>

      </div>
      {/* <div className='delivery-stts' style={{ display: isEligble ? 'block' : 'none' }}>
        <div className='if-home-delivery'>
          <input type='radio' name='delivery' />Pick Up
          <input type='radio' name='delivery' />Home Delivery
          <button>Save Info</button>
          <p style={{ display: isEligble ? 'none' : 'block' }}>Sorry Delivery not Available in your Area</p>
        </div>

      </div> */}
      {/* Will be implemented in 2.0 */}

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