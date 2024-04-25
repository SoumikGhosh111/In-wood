import React, {useEffect, useState} from 'react'; 
import "./CheckoutPageRightSide.css"; 

import { useSelector, useDispatch } from 'react-redux';


function CheckoutPageRightSide() {
  const [tax, setTax] = useState(0); 
  const [active, setActive] = useState(0);
  const [tipPercent, setTipPercent] = useState(0); 
  const [tipAmnt, setTipAmnt] = useState(null); 
  const [tip, setTip] = useState("none"); 
  const cartItems = useSelector((state) => state.cart.cart); 
  const totalAmnt =  cartItems.reduce((total, item) => 
    total  + item.qty * item.price, 
    0
  )

  useEffect(() => { 
    const EstimatedTax = ((totalAmnt * 2.9)/100).toFixed(2); 
    setTax(EstimatedTax)
  }, [totalAmnt])
  const SupportFee = 0.95;
  
  const handleActiveClassClick = (indx) => { 
    setActive(indx); 
    if(indx === 4){ 
      setTipAmnt(0)
    }else{ 
      setTipPercent(indx)
    }

  }

  useEffect(() => { 
    const tip = ((totalAmnt * tipPercent) / 100).toFixed(2); 
    setTipAmnt(tip)
  }, [tipPercent, totalAmnt])

  useEffect(() => { 
    if(active === 0){ 
      setTip("none")
    }else if(active === 4){ 
      setTip('custom'); 
    }else{ 
      setTip(`${active  }%`)
    }
  }, [tipPercent])
  return (
    <div className='check-out-right-side'>
      <button className='place-order-button' >
        <div className='place-order-button-inner' >
          <span>PLACE ODER</span>
          <spann>${(parseFloat(totalAmnt) + parseFloat(SupportFee) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2)}</spann>
        </div>
      </button>

      <div className='tax-tip-local'>
      <div className='tax'>
          <span>Sub-total</span>
          <span>${totalAmnt}</span>
        </div>
        <div className='tax'>
          <span>Estimated Tax</span>
          <span>${tax}</span>
        </div>
        <div className='tip'>
          <span>Tip Amount ({tip})</span>
          <span>${tipAmnt}</span>
        </div>
        <div className='local'>
          <span> Support Local Fee</span>
          <span>${SupportFee}</span>
        </div>
        {/* <div className='worker-tip-amnt'>
          <span className='worker'><span className='bolder'>Tip &nbsp;</span>100% goes to the restaurant's workers</span>
          <span>${tipAmnt}</span>
        </div> */}
        {/* <ul className='worker-tip-amnt-btn'>
          <li className={active === 0 ? 'active' : ''} onClick={ () => handleActiveClassClick(0)}>
            None
          </li>
          <li className={active === 5 ? 'active' : ''} onClick={ () => handleActiveClassClick(5)}> 
            5%
          </li >
          <li className={active === 10 ? 'active' : ''} onClick={ () => handleActiveClassClick(10)}>
            10%
          </li>
          <li className={active === 15 ? 'active' : ''} onClick={ () => handleActiveClassClick(15)}>
            15%
          </li>
          <li className={active === 4 ? 'active' : ''} onClick={ () => handleActiveClassClick(4)}>
            Other
          </li>
        </ul> */}

        <div className='all-total'>
          <span>Total</span>
          <span>${(parseFloat(totalAmnt) + parseFloat(SupportFee) + parseFloat(tax) + parseFloat(tipAmnt)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPageRightSide