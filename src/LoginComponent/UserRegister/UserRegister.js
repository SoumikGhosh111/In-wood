import React from 'react'
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Verify from '../Verify/Verify';
import background from "../../assets/abc.jpg";
import videoBG from "../../assets/videoBG.mp4";
import "./UserRegister.css";

import { useAnimate } from "framer-motion";

function UserRegister() {

    const [scope, animate] = useAnimate();

    const handleLoginClicked = () => {
        animate("#login", { x: "10vw", opacity: 0 }, { duration: 0.5 });
        animate("#video", { x: "-50vw" }, { duration: 0.5 });
        animate("#signup", { x: 0, opacity: 1 }, { duration: 0.5 });
    }

    const handSignupClicked = () => {
        animate("#signup", { x: "-10vw", opacity: 0 }, { duration: 0.5 });
        animate("#video", { x: "0" }, { duration: 0.5 });
        animate("#login", { x: "0", opacity: 1 }, { duration: 0.5 });
    }

    const signUpFormSubmisson = () => { 
        animate("#sign-up-form-inner", { y: "-90vh", opacity: 0 }, { duration: 0.5 });
        animate("#verify", { y: "0", opacity: 1 }, { duration: 0.5 });
    }
    return (
        <div className='user-register-wrapper'>
            <img className='bgPizza' src={background} alt="PizzaImg" />
            {/* <Login />
        <Signup /> */}
            <div className='form-container' ref={scope}>
                <div className='login-form' id='login'>
                    <Login onButtonClick={handleLoginClicked} />
                </div>
                <div className='signup-form' id='signup'>
                    <div id='sign-up-form-inner'><Signup onButtonClick={handSignupClicked} onFormSubmisson = {signUpFormSubmisson}/></div>
                    <div className='verify-form-wrapper' id='verify'>
                        <Verify />
                    </div>
                </div>

                <div className='video-bg' id='video'>
                    <video playsInline="playsIvideo-bgnline" autoPlay="autoPlay" muted="muted" loop="loop">
                        <source src={videoBG} type='video/mp4' />
                        Browser not supported
                    </video>
                </div>
            </div>
        </div>
    )
}

export default UserRegister;