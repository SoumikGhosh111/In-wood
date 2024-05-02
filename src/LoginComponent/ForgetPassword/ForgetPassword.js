import React, { useState } from 'react';
import "./ForgetPassword.css"
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import background from "../../assets/abc.jpg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forgetpassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState('');
    const [isEmailChecked, setIsEmailChecked] = useState(true);
    const [isOtpChecked, setIsOtpChecked] = useState(false);
    const [isNewPasswordChecked, setIsNewPasswordChecked] = useState(false);
    const [resolved, setResolved] = useState(false); 
    const navigate = useNavigate();



    
    const handleForgotPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/users/sendOtp', { email });
            setResolved(true) 
            console.log(email);
            setMessage(response.data.message);
            setIsEmailChecked(false);
            setIsOtpChecked(true);
            toast.success(response.data.message); 
        } catch (error) {
            console.error('Failed to initiate forgot password:', error);
            toast.error(error.message);
            setResolved(false); 
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/verifyOtp', { email, otp });
            setMessage(response.data.message);
            setUserId(response.data.userId);
            setIsOtpChecked(false);
            setIsNewPasswordChecked(true);
            toast.success(response.data.message);
        } catch (error) {
            console.error('Failed to verify OTP:', error);
            toast.error('Failed to verify OTP');
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/changePassword', { userId, newPassword });
            setMessage(response.data.message);
            toast.success(response.data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1000)
        } catch (error) {
            console.error('Failed to change password:', error);
            toast.error('Failed to change password');
        }
    };

    return (
        // <div>
        //   <h2>Forgot Password</h2>
        //   <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        //   <button onClick={handleForgotPassword}>Send OTP</button>
        //   <br />
        //   <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
        //   <button onClick={handleVerifyOTP}>Verify OTP</button>
        //   <br />
        //   <input type="password" placeholder="Enter New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        //   <button onClick={handleChangePassword}>Change Password</button>
        //   {message && <p>{message}</p>}
        // </div>

        <div className=''>
            <img className='bgPizza' src={background} alt="PizzaImg" />
            <div className='form-body-wrapper '>
                <div className='formBody'>
                    <div className='form-title change-password' ><h1>Change Password</h1></div>
                    <div className='emailTxt'>
                        <form className="form forget-pass-form-body" >
                            <div className="form__group" style={{ display: isEmailChecked ? 'block' : 'none' }}>
                                <h5>Enter e-mail</h5>
                                <input

                                    type="email"
                                    placeholder=""
                                    // required
                                    name='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                // ref={loginNameRef}
                                />
                            </div>
                            <div className="form__group2 forget-page-inputs" style={{ display: isOtpChecked ? 'block' : 'none' }}>
                                <h5>Enter Otp</h5>
                                <input
                                    type="text"
                                    placeholder=""

                                    name='otp'
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                // ref={loginPasswordRef}
                                />
                            </div>

                            <div className="form__group2 forget-page-inputs" style={{ display: isNewPasswordChecked ? 'block' : 'none' }}>
                                <h5>Enter New Password</h5>
                                <input
                                    type="password"
                                    placeholder=""

                                    name='password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                // ref={loginPasswordRef}
                                />
                            </div>
                            {/* <div className='frTxt'>
                                <Link className="small text-muted" to="/forgetpassword" style={{ color: 'white' }}>Forgot password?</Link>
                                <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Don't have an account? <Link to={'/register'} style={{ color: '#e60909' }}>Register here</Link></p>

                            </div> */}
                            <div className="loginbtn">
                                <button className='loginTxtbtn' style={{ fontWeight: "bold", display: isEmailChecked ? 'block' : 'none' }} onClick={(e) => handleForgotPassword(e)}>
                                    Handle Otp
                                </button>
                                <button className='loginTxtbtn' style={{ fontWeight: "bold", display: isOtpChecked ? 'block' : 'none' }} onClick={(e) => handleVerifyOTP(e)}>
                                    Verify Otp
                                </button>
                                <button className='loginTxtbtn' style={{ fontWeight: "bold", display: isNewPasswordChecked ? 'block' : 'none' }} onClick={(e) => handleChangePassword(e)}>
                                    Change Password
                                </button>
                            </div>
                            <div className='custom-message'>{message}</div>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Forgetpassword;