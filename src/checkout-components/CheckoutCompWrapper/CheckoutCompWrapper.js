import React, { useState } from 'react';
import "./CheckoutCompWrapper.css"
import CheckoutPageLeftSide from '../CheckoutPageLeftSide/CheckoutPageLeftSide';
import CheckoutPageRightSide from '../CheckoutPageRightSide/CheckoutPageRightSide';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import logo from "../../assets/maskot_logo_inwood.png";


// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// baseUrl
import { baseUrl } from '../../functions/baseUrl';

function CheckoutCompWrapper() {
  const [isClick, setIsClick] = useState(false);

  const [couponData, setCouponData] = useState(null);

  const [idAndCode, setIdAndCode] = useState(null); 

  const handleClick = () => {
    setIsClick(true);
  }

  const handleCouponData = async(data) => {
    setIdAndCode(data); 
    
    try{ 
      const response = await fetch(`${baseUrl}/api/coupon/useCoupon`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(data)
      }); 

      if (!response.ok) { 
        toast.error(response.message); 
      }
      if(response.ok){ 
        toast.info(response.message); 
      }

      const result = await response.json(); 
      setCouponData(result); 
      console.log(result, "THIS IS RESULT"); 
      toast.info(result.message); 
      // toast.success(')
    }catch(error){ 
      console.error(error.message); 
      toast.error(error.message);
    }
}


  console.log(couponData);

  return (

    <>
      <div className={`check-out-comp-wrapper ${isClick ? "disable-scroll" : ""}`}>


        <div className='check-out-page-left'>
          <CheckoutPageLeftSide onEdtBtnClick={handleClick} handleCoupon={handleCouponData} />

        </div>
        <div className='check-out-page-right'>

          <CheckoutPageRightSide couponData={couponData} idAndCode={idAndCode}/>
          {/* <div className ='logo-div-check-out'>
            <img  src = {logo} style={{width: '90%', height: 'auto'}} alt='Logo Image'/>
          </div> */}
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
      <ToastContainer
        position='top-center'
        className={'toast-container-center'}
      />
    </>

  )
}

export default CheckoutCompWrapper