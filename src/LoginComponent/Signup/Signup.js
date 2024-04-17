import React from 'react'

// import background from "../../assets/abc.jpg"; 

import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

function Signup({onButtonClick, onFormSubmisson}) {

    const navigate = useNavigate()
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const from = e.target
        const name = from.name.value
        const email = from.email.value
        const password = from.password.value
        const passwordConfirm = from.confirmPassword.value
        const userData = { name, email, password, passwordConfirm }
        console.log(userData)
        fetch('http://localhost:8000/api/users/register', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    localStorage.setItem("token", data.data.token);
                    toast.success(data.message)
                    from.reset()
                    navigate('/')
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });
    }
    return (
        <div>
            <div className='formBody'>
                <div className='form-title'><h1 style={{ fontSize: "9vh" }}>Sign up</h1></div>
                <div className='emailTxt' style={{ marginTop: "22px" }}>
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
                            <h5>Phone/e-mail</h5>
                            <input
                                type="email"
                                placeholder=""
                                required
                                name="email"
                            // ref={loginNameRef}
                            />
                        </div>
                        <div className='passBox' style={{ display: 'flex', marginTop: "4.5vh" }}>
                            <div className="form__group2">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    placeholder=""
                                    required
                                    name="password"
                                // ref={loginPasswordRef}
                                />
                            </div>
                            <div className="form__group2">
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
                        <div className='frTxt'>
                            <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>have an account? <Link onClick={onButtonClick} style={{ color: '#e60909' }}> login here</Link></p>

                        </div>
                        <div className="loginbtn" style={{ marginTop: "7vh" }}>
                            <button type="submit" onClick={onFormSubmisson} className='loginTxtbtn' style={{ fontWeight: "bold" }} >
                                Sign up
                            </button>
                        </div>
                        <ToastContainer />
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Signup; 



// 