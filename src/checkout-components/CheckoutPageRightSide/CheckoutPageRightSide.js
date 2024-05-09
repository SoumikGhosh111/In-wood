import React, { useEffect, useState } from 'react';
import "./CheckoutPageRightSide.css";

import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CheckoutPageRightSide() {
  const [tax, setTax] = useState(0);
  const [active, setActive] = useState(0);
  const [tipPercent, setTipPercent] = useState(0);
  const [tipAmnt, setTipAmnt] = useState(null);
  const [tip, setTip] = useState("none");
  const [popUp, setPopUp] = useState(false); 
  const cartItems = useSelector((state) => state.cart.cart);
  const userData = useSelector((state) => state.userdata);
  console.log(userData);
  const totalAmnt = cartItems.reduce((total, item) =>
    total + item.qty * item.price,
    0
  )

  useEffect(() => {
    const EstimatedTax = ((totalAmnt * 8.75) / 100).toFixed(2);
    setTax(EstimatedTax)
  }, [totalAmnt])
  const SupportFee = 0.95;

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




  const confirmOrder = () => { 
   
  }

  const handlePlaceOrderClick = () => {
    if (cartItems.length === 0) {
      // alert("No items in the cart");
      toast.error("No items in the cart")
    }
    else if (userData.userId === null && userData.zipCode === null) {
      // alert("Save the address data");
      toast.error("Save the address data");
    } else if (cartItems.length > 0 && userData.userId !== null && userData.zipCode !== null) {
      const cartData = cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        // id: item.id,
        toppings: item.toppings ? item.toppings.map(topping => ({ text: topping.text })) : []
      }));

      const tempPriceData = cartItems.map(item => ({ 
        price: item.price,
        qty: item.qty,
      })); 
      const data = {
        cartItems,
        cartData,
        tempPriceData, 
        userData,
        amount: {
          subTotal: totalAmnt,
          estimatedTax: tax,
          supportLocalfee: SupportFee,
          total: (parseFloat(totalAmnt) + parseFloat(tax))
        },
        // toppings: cartItems.map((item) => item.toppings ?  item.toppings.map((topping) => topping.text) : null) 
      }
      console.log(data)
      const id = userData.userId;

      axios
        .post('http://localhost:8000/api/stripe/create-checkout-session', {
          data: data,
          userId: id,
        })
        .then((response) => {
          if (response.data.url) {
            toast.success("redirecting to Payment page");
            setTimeout(() => {
              window.location.href = response.data.url;
            }, 2000)
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err);
        })
    }
  }







  return (
    <div className='check-out-right-side'>
      <div style={{display: popUp ? 'none' : 'block'}}>
        <button className='place-order-button' onClick={() => setPopUp(true)} >
          <div className='place-order-button-inner' >
            <span>PLACE ODER</span>
            {/* <spann>${(parseFloat(totalAmnt) + parseFloat(SupportFee) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2)}</spann> */}
          </div>
        </button>

        <div className='tax-tip-local'>
          <div className='tax'>
            <span>Sub-total</span>
            <span>${(totalAmnt).toFixed(2)}</span>
          </div>
          <div className='tax'>
            <span>Estimated Tax</span>
            <span>${tax}</span>
          </div>
          {/* <div className='tip'>
          <span>Tip Amount ({tip})</span>
          <span>${tipAmnt}</span>
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

          <div className='all-total'>
            <span>Total</span>
            <span>${(parseFloat(totalAmnt) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2)}</span>
          </div>
        </div>
      </div>
        <div className='pop-u-checkout' style={{display: popUp ? 'block':'none'}}>
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
      <ToastContainer />

    </div>
  )
}

export default CheckoutPageRightSide