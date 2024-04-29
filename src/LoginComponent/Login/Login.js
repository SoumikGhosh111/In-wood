import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import background from "../../assets/abc.jpg";
import "./Login.css";
import axios from 'axios';


function Login({ onButtonClick }) {

    const navigate = useNavigate()

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        const from = e.target
        const email = from.email.value
        const password = from.password.value
        const userData = { email, password }

        fetch('http://localhost:8000/api/users/login', {
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
                    // toast.success(data.message)
                    alert(data.message)
                    from.reset()
                    navigate('/');
                    localStorage.setItem('userEmail', email); 
                }
                else {
                    // toast.error(data.message)
                    alert(data.message);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error here
            });


    }




    return (
        <div className=''>
            <img className='bgPizza' src={background} alt="PizzaImg" />
            <div className='form-body-wrapper'>
                <div className='formBody'>
                    <div className='form-title'><h1>log in</h1></div>
                    <div className='emailTxt'>
                        <form className="form" onSubmit={handleOnSubmit}>
                            <div className="form__group">
                                <h5>Phone/e-mail</h5>
                                <input
                                    type="email"
                                    placeholder=""
                                    required
                                    name='email'
                                // ref={loginNameRef}
                                />
                            </div>
                            <div className="form__group2">
                                <h5>Password</h5>
                                <input
                                    type="password"
                                    placeholder=""
                                    required
                                    name='password'
                                // ref={loginPasswordRef}
                                />
                            </div>
                            <div className='frTxt'>
                                <Link className="small text-muted" to="/forgetpassword" style={{ color: 'white' }}>Forgot password?</Link>
                                <p className="mb-5 pb-lg-2" style={{ color: 'white' }}>Don't have an account? <Link to={'/register'} style={{ color: '#e60909' }}>Register here</Link></p>

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
        </div>
    )
}

export default Login;





