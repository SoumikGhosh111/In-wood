import React, { useState } from 'react';
import "./CheckoutCompWrapper.css"
import CheckoutPageLeftSide from '../CheckoutPageLeftSide/CheckoutPageLeftSide';
import CheckoutPageRightSide from '../CheckoutPageRightSide/CheckoutPageRightSide';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

function CheckoutCompWrapper() {
  const [isClick, setIsClick] = useState(false);
  const handleClick = () => {
    setIsClick(true);
  }
  return (

    <>
      <div className={`check-out-comp-wrapper ${isClick ? "disable-scroll" : ""}`}>

        <div className='check-out-page-left'>
          <CheckoutPageLeftSide onEdtBtnClick={handleClick} />
        </div>
        <div className='check-out-page-right'>
          <CheckoutPageRightSide />
        </div>


      </div>
        <div className='pick-up-insc' style={{ display: isClick ? "flex" : "none" }}>
          <div className='pick-up-optn-card'>
            <div className='cancel-button'>
              <CancelRoundedIcon sx={{ cursor: "pointer" }} onClick={() => setIsClick(false)} />
            </div>
            <div className='optn'>
              
            </div>
          </div>
        </div>
    </>

  )
}

export default CheckoutCompWrapper