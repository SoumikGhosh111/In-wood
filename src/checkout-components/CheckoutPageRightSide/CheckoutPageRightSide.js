import React, { useEffect, useState } from 'react';
import "./CheckoutPageRightSide.css";

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import logo from "../../assets/maskot_logo_inwood.png";
import { baseUrl } from '../../functions/baseUrl';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function CheckoutPageRightSide({couponData, idAndCode, couponRemove}) {
  const temp = JSON.parse(localStorage.getItem('specialOrder'));
  const [specialOffer, setSpecialOffer] = useState(null);
  const [tax, setTax] = useState(0);
  const [active, setActive] = useState(0);
  const [tipPercent, setTipPercent] = useState(0);
  const [tipAmnt, setTipAmnt] = useState(null);
  const [tip, setTip] = useState("none");
  const [popUp, setPopUp] = useState(false);
  const cartItems = useSelector((state) => state.cart.cart);
  const userData = useSelector((state) => state.userdata);
  const specialOffersObj = useSelector(state => state.specialoffer.specialOrder);
  const [selectedOption, setSelectedOption] = useState(0);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [support, setSupport] = useState(0);
  const [dscnt, setDscnt] = useState(0); // this will be used for discount purposes in the future
  console.log(couponData, "this is coupon data"); 

  // for Home delivery and Pickup
  const [isClicked, setIsClicked] = useState('Delivery');

  console.log(userData, "Checkut Right User Data");

 

  // const [deliveryCharges, setDeliveryCharges] = useState(0);
  // const [openClose, setOpenClose] = useState(null);

  const [specialOffersAmnt, setSpecialOffersAmnt] = useState(0);
  console.log(userData);
  const tempAmnt = cartItems.reduce((total, item) =>
    total + item.qty * item.price,
    0
  );
  console.log(specialOffersObj)
  useEffect(() => {
    if (specialOffersObj.hasOwnProperty('totalAmount')) {
      setSpecialOffersAmnt(specialOffersObj.totalAmount);
    } else {
      setSpecialOffersAmnt(0);
    }
  }, [specialOffersObj]);

  const totalAmnt = tempAmnt + specialOffersAmnt;
  const discountAmnt = couponData?.hasOwnProperty("discountPercentage") ? couponData?.discountPercentage : 0; 
  const totalDiscount = (couponData?.hasOwnProperty("discount") ?  couponData?.discount : 0 ).toFixed(2) 


  console.log("this is offerPrice", specialOffersAmnt);

  useEffect(() => {
    setSpecialOffer(JSON.parse(localStorage.getItem('specialOrder')));
  }, [localStorage.getItem('specialOrder')])
  console.log(localStorage.getItem('specialOrder'));

  // const handleOptionSelect = (event) => {
  //   setSelectedOption(event.target.value);
  // };

  const SupportFee = 0.99;
  const charges = 2.99;


  useEffect(() => {
    // let discount = ((totalAmnt * selectedOption) / 100).toFixed(2);
    // setDscnt(discount);
    // let temp = totalAmnt === 0 ? 0 : totalAmnt - discount;
    const EstimatedTax = (((totalAmnt) * 8.75) / 100).toFixed(2);
    setTax(EstimatedTax);
    setDeliveryCharges((totalAmnt > 0 && isClicked === 'Delivery') ? charges : 0);
    // setDeliveryCharges(isClicked === 'Delivery' ? charges : 0);
    // if (totalAmnt === 0) {
    //   setSelectedOption(0)
    // }
    setSupport(totalAmnt > 0 ? SupportFee : 0);
  }, [totalAmnt, isClicked])


  // const handleActiveClassClick = (indx) => {
  //   setActive(indx);
  //   if (indx === 4) {
  //     setTipAmnt(0)
  //   } else {
  //     setTipPercent(indx)
  //   }

  // }

  useEffect(() => {
    const tip = ((totalAmnt * tipPercent) / 100).toFixed(2);
    setTipAmnt(tip)
  }, [tipPercent, totalAmnt])

  // useEffect(() => {
  //   if (active === 0) {
  //     setTip("none")
  //   } else if (active === 4) {
  //     setTip('custom');
  //   } else {
  //     setTip(`${active}%`)
  //   }
  // }, [tipPercent]);





  // const handlePlaceOrderClick = () => {
  //   console.log("I am Clicked, this is special offer")
  //   if (cartItems.length === 0 && Object.keys(specialOffersObj).length === 0) {
  //     // alert("No items in the cart");
  //     toast.error("No items in the cart");
  //   }
  //   else if (userData.userId === null && userData.zipCode === null) {
  //     // alert("Save the address data");
  //     toast.error("Save the address data");
  //   } else if (cartItems.length > 0  && userData.userId !== null && userData.zipCode !== null) {
  //     const cartData = cartItems.map(item => ({
  //       name: item.name,
  //       qty: item.qty,
  //       img: item.img,
  //       // id: item.id,
  //       toppings: item.toppings ? item.toppings.map(topping => ({ text: topping.text })) : []
  //     }));

  //     const tempPriceData = cartItems.map(item => ({
  //       price: item.price,
  //       qty: item.qty,
  //     }));

  //     const comboData = specialOffersObj; 
  //     const data = {
  //       comboData,
  //       cartItems,
  //       cartData,
  //       tempPriceData,
  //       userData,
  //       amount: {
  //         subTotal: totalAmnt,
  //         estimatedTax: tax,
  //         supportLocalfee: SupportFee,
  //         total: (parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(support) + parseFloat(deliveryCharges))
  //       },
  //       // toppings: cartItems.map((item) => item.toppings ?  item.toppings.map((topping) => topping.text) : null) 
  //     }
  //     console.log(data)
  //     const id = userData.userId;

  //     axios
  //       .post(`${baseUrl}/api/stripe/create-checkout-session`, {
  //         data: data,
  //         userId: id,
  //       })
  //       .then((response) => {
  //         if (response.data.url) {
  //           toast.success("redirecting to Payment page");
  //           setTimeout(() => {
  //             window.location.href = response.data.url;
  //           }, 2000)
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         toast.error(err.message);
  //       })
  //   }
  // }


  const handlePlaceOrderClick = () => {
    // console.log(Object.keys(specialOffersObj).length);
    if (cartItems.length === 0 && Object.keys(specialOffersObj).length === 0) {
      // alert("No items in the cart");
      toast.error("No items in the cart");
    }
    else if (userData.userId === null && userData.zipCode === null && isClicked === 'Delivery') {
      // alert("Save the address data");
      toast.error("Save the address data");
    } else if ((cartItems.length > 0 || Object.keys(specialOffersObj).length > 0) && ((userData.userId !== null && userData.zipCode !== null) || isClicked === 'Pickup')) {
      const cartData = cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        img: item.img,
        // id: item.id,
        toppings: item.toppings ? item.toppings.map(topping => ({ text: topping.text })) : []
      }));

      const tempPriceData = cartItems.map(item => ({
        price: item.price,
        qty: item.qty, 
      }));
      const deliveryType = { 
        type: isClicked, 
      }
      // const couponCode = {}; 
      // if(idAndCode!== null){ 
      //   couponCode = {couponCode: idAndCode.couponCode}; 
      // }
      

      const comboData = specialOffersObj;
      const data = {
        comboData,
        cartItems,
        cartData,
        tempPriceData,
        userData,
        deliveryType,
        couponCode: idAndCode?.couponCode, 
        amount: {
          subTotal: totalAmnt,
          estimatedTax: tax,
          supportLocalfee: SupportFee,
          total: (parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(support) + parseFloat(deliveryCharges) - parseFloat(totalDiscount))
        },
        // toppings: cartItems.map((item) => item.toppings ?  item.toppings.map((topping) => topping.text) : null) 
      }
      console.log(data)
      const id = userData.userId;

      // axios
      //   .post(`${baseUrl}/api/stripe/create-checkout-session`, {
      //     data: data,
      //     userId: id,
      //   })
      //   .then((response) => {
      //     if (response.data.url) {
      //       toast.success("redirecting to Payment page");
      //       setTimeout(() => {
      //         window.location.href = response.data.url;
      //       }, 2000)
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     toast.error(err.message);
      //   })
    }
  }



  const fetchStoreOpenCloseData = async () => {

    try {
      const response = await fetch(`${baseUrl}/api/store/storeStatus`);
      const result = await response.json();

      if (result.status === 'close') {
        toast.error('Oops Store is closed');
      }
      setPopUp(result.status === 'open');
    }
    catch (err) {
      toast.error(err.message);
    }

  }


  const HandleClickValue = (id) => {
    setIsClicked(id);
  }
console.log(couponData, "THIS IS CCCCC")

// function remove coupon
  
  return (
    <div className='check-out-right-side'>
      <div className='check-out-right-select-tab'>
        <div className={`home-delivery check-out-right-select-tab-item ${isClicked === 'Delivery' ? 'clicked' : 'not-clicked'}`} onClick={() => HandleClickValue('Delivery')}> Home Delivery</div>
        <div className={`home-delivery check-out-right-select-tab-item ${isClicked === 'Pickup' ? 'clicked' : 'not-clicked'}`} onClick={() => HandleClickValue('Pickup')}>Pick Up</div>
      </div>
      <div className='check-out-right-time-dropdown' style={{ display: isClicked === 'Pickup' ? 'block' : 'none' }}>
        Pick Your Oder at <span className='check-out-right-time-dropdown-inner-text'>179 SHERMAN AVE , NY 10034, New York, NY, United States, New York</span>
        
      </div>
      <div style={{ display: popUp ? 'none' : 'block' }}>
        <button className='place-order-button' onClick={fetchStoreOpenCloseData} >
          {/* <div className='place-order-button-inner' > */}
          {/* <span> */}
          PLACE ORDER

          {/* </span> */}
          {/* <spann>${(parseFloat(totalAmnt) + parseFloat(SupportFee) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2)}</spann> */}
          {/* </div> */}
        </button>

        <div className='tax-tip-local'>
          <div className='tax'>
            <span>Sub-total</span>
            <span>${(totalAmnt).toFixed(2)}</span>
          </div>
          <div className='tax'>
            <span>Maintenance fee for the website</span>
            <span>${SupportFee}</span>
          </div>
          <div className='tax'>
            <span>Delivery Charges</span>
            <span>${isClicked === 'Delivery' ? charges : 0}</span>
          </div>
          <div className='tax'>
            <span>Estimated Tax (8.75%)</span>
            <span>${tax}</span>
          </div>
          <div className='tax'>
            <span>Discount({couponData?.hasOwnProperty("discountPercentage") ? `${couponData?.discountPercentage}%` : "0%"})</span>
            <span>${totalDiscount}</span>
          </div>

          {/* <div className='tip' >
            <span>Delivery Charges  </span>
            <span >${totalAmnt > 0 ? deliveryCharges : 0}</span>
          </div> */}
          {/* <div className='local'>
          <span> Support Local Fee</span>
          <span>${SupportFee}</span>
        </div> */}
          {/* <div className='worker-tip-amnt'>
          <span className='worker'><span className='bolder'>Tip &nbsp;</span>100% goes to the restaurant's workers</span>
          <span>${tipAmnt}</span>
        </div> */}
          {/* <ul className='worker-tip-amnt-btn'>
          <li className={active === 0 ? 'active-tip' : ''} onClick={ () => handleActiveClassClick(0)}>
            None
          </li>
          <li className={active === 5 ? 'active-tip' : ''} onClick={ () => handleActiveClassClick(5)}> 
            5%
          </li >
          <li className={active === 10 ? 'active-tip' : ''} onClick={ () => handleActiveClassClick(10)}>
            10%
          </li>
          <li className={active === 15 ? 'active-tip' : ''} onClick={ () => handleActiveClassClick(15)}>
            15%
          </li>
          <li className={active === 4 ? 'active-tip' : ''} onClick={ () => handleActiveClassClick(4)}>
            Other
          </li>
        </ul> */}

          {/* <div className='all-total'>
            <span>Total</span>
            <span>${(parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2) + parseFloat(deliveryCharges)}</span>
          </div> */}
          <div className='all-total'>
            {/* <span>Total</span> 
            <span>${(parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(tipAmnt) + parseFloat(deliveryCharges)).toFixed(2)}</span> */}
            <span>Total</span>
            {totalAmnt === 0 ? ( // Display 0 if subtotal is 0
              <span>$0.00</span>
            ) : ( // Otherwise calculate total amount
              <span> <span style={{textDecoration: 'line-through'}}>{totalDiscount > 0 ? `$${(parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(deliveryCharges) + parseFloat(support) + parseFloat(tipAmnt)).toFixed(2)}` : ''} </span> &nbsp;  ${(parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(deliveryCharges) + parseFloat(support) + parseFloat(tipAmnt) - parseFloat(totalDiscount)).toFixed(2)}</span>
            )}
          </div>

          {(couponData && couponData.hasOwnProperty("discountPercentage") && couponData.hasOwnProperty("maxDiscountValue")) && 
            <div>
            <h3 style={{marginBottom: '0.5rem'}}>Applied Coupon</h3>
            <div className='coupon-items-checkout'>
              <div className='hor-line-coupons'></div>
              <div className='coupon-code-apply-button'>
                <div>
                  <h3>{idAndCode?.couponCode}</h3>
                  <span style={{ fontSize: '15px', fontWeight: '700' }}>{couponData?.discountPercentage}% off on your order (upto ${couponData?.maxDiscountValue})</span><br />
                  
                </div>
                <div className='coupon-apply-button' onClick={couponRemove}>REMOVE</div>
              </div>

            </div>
          </div>
          }
        </div>
      </div>

      {/* <div className="checkout-right-dropdown">
        Apply Offer &nbsp;
        <select
          className="checkout-right-dropdown-select"
          value={selectedOption}
          onChange={handleOptionSelect}
        >
          <option value={0}>Select Offer</option>
          <option value={10}>Apply 10% Coupen</option>
          <option value={12}>Apply 12% Coupen</option>
          <option value={18}>Apply 18% Coupen</option>
        </select>
      </div> */}


      <div className='pop-u-checkout' style={{ display: popUp ? 'block' : 'none' }}>
        <div className='pop-up-inner'>
          <div className='pop-up-text'>
            <span> After Proceeding to the Payment Page </span>
            <span>YOU CAN NOT CANCEL YOUR ORDER</span>
          </div>

          <div className='pop-up-buttons'>
            <button onClick={handlePlaceOrderClick}>Proceed to payment</button>
            <button onClick={() => setPopUp(false)}>Cancel</button>
          </div>
        </div>
      </div>

      {/* <ToastContainer
        position='top-center'
        className={'toast-container-center'}
      /> */}

    </div>
  )
}

export default CheckoutPageRightSide