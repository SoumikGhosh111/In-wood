import React, { useState } from 'react';
import Verify from '../LoginComponent/Verify/Verify';
// import "../Login/Login.css";
// import "../LoginComponent/Login/Login.css"
// import "./Verify.css"

// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify"
// import 'react-toastify/dist/ReactToastify.css';

// import axios from 'axios';

// function OtpPage() {
//     const location = useLocation();
//     const [email, setEmail] = useState(location.state ? location.state.email : '');
//     console.log(email)
//     const [combineOtp, setCombineOTP] = useState('');
//     const navigate = useNavigate();

//     const handleVerifyOTP = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8000/api/users/otpVerify', { email, combineOtp });
//             if (response.data.success) {
//                 // toast.success(response.data.message); // Use response.data.message
//                 alert(response.data.message); 
//                 navigate('/');
//             } else {
//                 alert(response.data.message); // Use response.data.message
//             }
//         } catch (error) {
//             console.error('Failed to verify OTP:', error);
//         }
//     };



//     return (
//         <div>
//             <div className='formBody verify-form'>
//                 <div className='form-title'><h1 style={{ fontSize: "9vh" }}>Sign up</h1></div>
//                 <div className='emailTxt' style={{ marginTop: "22px" }}>
//                     <form className="form mb-5" onSubmit={handleVerifyOTP}>
//                         <div className="form__group">
//                             <h5>OTP</h5>
//                             <input
//                                 type="hidden"
//                                 value={email}
//                                 readOnly
//                             />

//                             <input
//                                 type="text"
//                                 placeholder="Enter OTP"
//                                 value={combineOtp}
//                                 onChange={(e) => setCombineOTP(e.target.value)}
//                             />

//                         </div>
//                         <div className='frTxt'>
//                             {/* <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Resend <Link style={{ color: '#e60909' }}> OTP</Link></p> */}

//                         </div>



//                         <div className="loginbtn" style={{ marginTop: "7vh" }}>
//                             <button type="submit" className='loginTxtbtn' style={{ fontWeight: "bold", cursor: "pointer" }}>
//                                 Verify
//                             </button>
//                         </div>
//                         {/* <ToastContainer /> */}
//                     </form>

//                 </div>
//             </div>
//         </div>
//     )
// }

function OtpPage() { 
    return ( 
        <div>
            <Verify />
        </div>
    )
}

export default OtpPage