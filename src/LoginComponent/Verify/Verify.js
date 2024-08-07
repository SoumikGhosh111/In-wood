import React, { useState } from 'react';
import "../Login/Login.css";
import "./Verify.css"
import background from "../../assets/abc.webp"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import { baseUrl } from '../../functions/baseUrl';

import axios from 'axios';

function Verify() {
    const location = useLocation();
    const [email, setEmail] = useState(location.state ? location.state.email : '');
    console.log(email)
    const [otp, setCombineOTP] = useState('');
    const navigate = useNavigate();

    const token = localStorage.getItem("token"); 

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${baseUrl}/api/users/otpVerify`, { email, otp}, { 
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem("token")}` // Correct syntax for setting Authorization header
                // }
            });
            // localStorage.setItem('userEmail', email); 
            if (response.data.success) {
                localStorage.setItem('token', response.data.token);
                toast.success(response.data.message); // Use response.data.message
                // alert(response.data.message);
                setTimeout(()=> { 
                    navigate('/');
                }, 2000); 
            } else {
                // alert(response.data.message); // Use response.data.message
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error('Failed to verify OTP:', error);
        }
    };



    return (
        <div>
            <img className='bgPizza' src={background} alt="PizzaImg" />
            <div className='verify-body-wrapper'>
                <div className='formBody verify-form'>
                    <div className='form-title'><h1 style={{ fontSize: "9vh" }}>Enter Otp</h1></div>
                    <div className='emailTxt' style={{ marginTop: "22px" }}>
                        <form className="form mb-5" onSubmit={handleVerifyOTP}>
                            <div className="form__group">
                                <h5>OTP</h5>
                                <input
                                    type="hidden"
                                    value={email}
                                    readOnly
                                />

                                <input
                                    type="text"
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setCombineOTP(e.target.value)}
                                />

                            </div>
                            <div className='frTxt'>
                                {/* <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Resend <Link style={{ color: '#e60909' }}> OTP</Link></p> */}

                            </div>



                            <div className="loginbtn" style={{ marginTop: "7vh" }}>
                                <button type="submit" className='loginTxtbtn' style={{ fontWeight: "bold", cursor: "pointer" }}>
                                    Verify
                                </button>
                            </div>
                            <ToastContainer />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Verify