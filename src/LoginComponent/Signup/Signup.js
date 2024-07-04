import React, { useState } from 'react'

import background from "../../assets/abc.webp";

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import "./Signup.css"
import { baseUrl } from '../../functions/baseUrl';
import axios from "axios"; 

// phone react 
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css'; 

function Signup() {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    // const [phone, setPhone] = useState(''); 

    // console.log(phone); 

    // const handleOnSubmit = async (e) => {
    //     e.preventDefault();
    //     const from = e.target
    //     const name = from.name.value
    //     const email = from.email.value
    //     const password = from.password.value
    //     const passwordConfirm = from.confirmPassword.value
    //     const userData = { name, email, password, passwordConfirm }
    //     console.log(userData)
    //     fetch('http://localhost:8000/api/users/register', {
    //         method: "POST",
    //         headers: {
    //             "content-type": "application/json"
    //         },
    //         body: JSON.stringify(userData)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.success) {
    //                 localStorage.setItem("token", data.data.token);
    //                 toast.success(data.message)
    //                 from.reset()
    //                 navigate('/')
    //             }
    //             else {
    //                 toast.error(data.message)
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             // Handle error here
    //         });
    // }
    const isPasswordValid = (password) => {
        return password.length > 7;
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const from = e.target;
        const name = from.name.value;
        const password = from.password.value;
        const passwordConfirm = from.confirmPassword.value;
        const userData = { name, email, password, passwordConfirm };

        if (!isPasswordValid(password)) {
            toast.error('Password must be at least 8 characters long.');
            return;
        }
        fetch(`${baseUrl}/api/users/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    localStorage.setItem('token', data.data.token);
                    // toast.success(data.message); // Display toast message
                    toast.success("Register Successfully"); 
                    // alert(data.message);
                    localStorage.setItem('userEmail', email); 
                    setTimeout(() => {
                        from.reset();
                        // navigate('/otppage', { state: { email } }); // Pass email as state
                        navigate('/special-offers');
                    }, 2000)


                } else {
                    toast.error(data.message);
                    // alert(data.message)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;

        setEmail(newEmail);
        console.log(newEmail);
        // localStorage.setItem('userEmail', newEmail); 
    };



    return (
        <div>
            <img className='bgPizza' src={background} alt="PizzaImg" />
            <div className='sign-up-body-wrapper'>
                <div className='formBody'>
                    <div className='form-title'><h1 style={{ fontSize: "9vh" }}>Sign up</h1></div>
                    <div className='emailTxt' > {/* //style={{ marginTop: "22px" }} */}

                        <form className="form mb-5" onSubmit={handleOnSubmit}>
                            <div className="form__group">
                                <h5>Name</h5>
                                <input
                                    type="text"
                                    required
                                    // ref={loginNameRef}
                                    name='name'
                                />
                            </div>

                            <div className="form__group">
                                <h5>E-mail</h5>
                                <input
                                    type="email"
                                    placeholder=""
                                    required
                                    name="email"
                                    value={email}
                                    onChange={(e) => handleEmailChange(e)}
                                // ref={loginNameRef}
                                />
                            </div>
                            {/* <div className="form__group">
                                <h5>Phone Number</h5>
                                <PhoneInput 
                                    country={'in'}
                                    value={phone}
                                    onChange={phone => setPhone(phone)}
                                />
                            </div> */}
                            <div className='passBox' > {/* style={{ display: 'flex', marginTop: "4.5vh" }} */}
                                <div className="form__group2 pass-cnfm-pass">
                                    <h5>Password</h5>
                                    <input
                                        type="password"
                                        placeholder=""
                                        required
                                        name="password"
                                    // ref={loginPasswordRef}
                                    />
                                </div>
                                <div className="form__group2 pass-cnfm-pass">
                                    <h5>Confirm Password</h5>
                                    <input
                                        type="password"
                                        placeholder=""
                                        required
                                        name="confirmPassword"
                                    // ref={loginPasswordRef}
                                    />
                                </div>
                            </div>
                            <div className='frTxt sign-up-frTxt'>
                                <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>have an account? <Link to={'/login'} style={{ color: '#e60909' }}> login here</Link></p>
                            </div>
                            <div className="loginbtn" style={{ marginTop: "7vh" }}>
                                <button type="submit" className='loginTxtbtn' style={{ fontWeight: "bold", cursor: "pointer" }} >
                                    Sign up
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

export default Signup;



// 