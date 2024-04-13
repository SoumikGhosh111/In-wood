import React from 'react';
import { Link } from "react-router-dom";
// import background from "../../assets/abc.jpg"; 
import "./Login.css"


function Login({ onButtonClick }) {
    return (
        <div >
            <div className='formBody'>
                <div className='form-title'><h1>log in</h1></div>
                <div className='emailTxt'>
                    <form className="form" >
                        <div className="form__group">
                            <h5>Phone/e-mail</h5>
                            <input
                                type="email"
                                placeholder=""
                                required
                            // ref={loginNameRef}
                            />
                        </div>
                        <div className="form__group2">
                            <h5>Password</h5>
                            <input
                                type="password"
                                placeholder=""
                                required
                            // ref={loginPasswordRef}
                            />
                        </div>
                        <div className='frTxt'>
                            <Link className="small text-muted" to="/forgetpassword" style={{ color: 'white' }}>Forgot password?</Link>
                            <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Don't have an account? <Link onClick={onButtonClick} style={{ color: '#e60909' }}>Register here</Link></p>

                        </div>
                        <div className="loginbtn">
                            <button type="submit" className='loginTxtbtn' style={{ fontWeight: "bold" }}>
                                Login
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Login