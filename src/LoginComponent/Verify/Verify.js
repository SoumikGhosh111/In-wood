import React from 'react'; 
import "../Login/Login.css"; 
import "./Verify.css"

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

function Verify() {
    return (
        <div>
            <div className='formBody verify-form'>
                <div className='form-title'><h1 style={{ fontSize: "9vh" }}>Sign up</h1></div>
                <div className='emailTxt' style={{ marginTop: "22px" }}>
                    <form className="form mb-5" >
                        <div className="form__group">
                            <h5>OTP</h5>
                            <input
                                type="text"
                                required
                                // ref={loginNameRef}
                                name='name'
                            />
                        </div>
                        <div className='frTxt'>
                            <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Resend <Link style={{ color: '#e60909' }}> OTP</Link></p>

                        </div>
                        
                         
                        
                        <div className="loginbtn" style={{ marginTop: "7vh" }}>
                            <button type="submit" className='loginTxtbtn' style={{ fontWeight: "bold" }}>
                                Verify
                            </button>
                        </div>
                        <ToastContainer />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Verify