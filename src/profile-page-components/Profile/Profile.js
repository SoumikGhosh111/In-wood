import React, { useState, useEffect } from 'react';
import "./Profile.css";

import bgGif from "../../assets/profile_page_demo.gif"
// functions
import { getUser } from '../../functions/veifyUser';
import { useLocation } from 'react-router-dom';

// axios
import axios from 'axios';

// incons
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import DoneIcon from '@mui/icons-material/Done';
import PersonIcon from '@mui/icons-material/Person';
import ApartmentIcon from '@mui/icons-material/Apartment';
import RoomIcon from '@mui/icons-material/Room';
import FlagIcon from '@mui/icons-material/Flag';
import QrCodeIcon from '@mui/icons-material/QrCode';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';

// pizza images
import bottomLeftSlice from "../../assets/bottom_left_slice_1.png";
import topLeftSlice from "../../assets/top_left_slice_1.png";
import mainSlice from "../../assets/main_slice_1.png"
import background from "../../assets/abc.jpg";
import pizzaProfile from "../../assets/pizza_profile_img.png"

// toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [image, setImage] = useState(null);

    const [profileImg, setProfileImg] = useState(null);

    const [userObj, setUserObj] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [imageChange, setImageChange] = useState(false);
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('');
    const [zipCode, setZipCode] = useState('');
    const useremail = localStorage.getItem("userEmail");

    // Function to handle image selection
    const handleImageChange = async (e) => {
        const file = e.target.files[0]; // Get the first selected file
        // setImage(file);

        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post('http://localhost:8000/api/image/uploadImage', formData);

            setImage(data.url);
            // console.log(image); 


        }
        catch (err) {
            console.log(err);
        }

    };
    // function to fetch user details
    const getUserDetails = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/users/userDetails/${useremail}`);
            const result = await response.json();
            console.log(result);
            if (result && result.data && result.data.user) {
                setUserObj(result.data.user);
                setUserName(result.data.user.name); // Update user name
                setUserId(result.data.user._id);
                if (result.data.user.hasOwnProperty("city")) {
                    setCity(result.data.user.city);
                }
                if (result.data.user.hasOwnProperty("country")) {
                    setCountry(result.data.user.country);
                }
                if (result.data.user.hasOwnProperty("state")) {
                    setState(result.data.user.state);
                }
                if (result.data.user.hasOwnProperty("street")) {
                    setStreet(result.data.user.street);
                }
                if (result.data.user.hasOwnProperty("zipCode")) {
                    setZipCode(result.data.user.zipCode);
                }
                if (result.data.user.hasOwnProperty("profileImg")) {
                    setProfileImg(result.data.user.profileImg);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    // funtion to update profile picture
    const updateProfilePicture = async () => {
        try {
            const imageData = {
                userId: userId,
                profileImg: image
            }
            const response = await fetch(`http://localhost:8000/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(imageData)
            });
            const result = await response.json();
            console.log(result, "this is upDateProfile")
            getUserDetails();
        }
        catch (err) {
            console.log(err);
        }
    }
    // function to update user details
    const updateUserDetails = async () => {
        try {
            const updatedUser = {
                userId: userId,
                name: userName,
                city: city,
                state: state,
                country: country,
                street: street,
                zipCode: zipCode
            };

            const response = await fetch(`http://localhost:8000/api/users/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedUser)
            });

            const result = await response.json();
            console.log(result); // Handle response from the server
            getUserDetails();
            toast.success("Info Saved successfully");
        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };


    useEffect(() => {
        getUserDetails();
    }, []);

    const handleBackToHome = () => {

        window.location.href = '/';

        // Clearing the browser's history
        window.history.replaceState(null, '', '/');
    }

    return (
        <div className='profile-page-container'>
            {/* <h1 className='profile-page-title'>EDIT PROFILE</h1> */}
            <div className='profile-pizza-bottom-left  pizza-imgs'>
                <img src={bottomLeftSlice} />
            </div>

            <div className='profile-pizza-top-left  pizza-imgs'>
                <img src={topLeftSlice} />
            </div>


            <div className='profile-pizza-main  pizza-imgs'>
                <img src={mainSlice} />
            </div>
            <div className='profile-blur-bg'>
                <div className='go-back-home-button-wrapper'>
                    <button className='go-back-home' onClick={handleBackToHome}><ArrowBackIosRoundedIcon sx={{ transform: "translateY(10%)" }} /></button>
                    {/* <div style={{margin: "0rem 1rem"}}>Logo</div> */}
                </div>
                <div className='profile-page-wrapper'>


                    <div className='profile-page-left'>
                        {/* <div className='profile-img'>
                            <img src={profileImg ? profileImg : background} alt="Profile Background" accept='.jpeg, .png, .jpg' />
                        </div>
                        <button onClick={() => setImageChange(true)} style={{ display: imageChange ? 'none' : 'block' }}><CameraAltOutlinedIcon sx={{ transform: "translateY(10%)" }} /></button>
                        <button onClick={() => { setImageChange(false); updateProfilePicture() }} style={{ display: imageChange ? 'block' : 'none' }}><DoneIcon sx={{ transform: "translateY(10%)" }} /></button>
                        {imageChange && (
                            <input className='input-image' type="file" onChange={(e) => handleImageChange(e)} accept="image/" />
                        )} */}
                        <img src={pizzaProfile} alt='bg gif profile page' />
                        {/* Hello World */}
                    </div>
                    <div className='profile-page-right'>
                        <div className='profile-page-form-container'>
                            <div className='profile-page-right-input'>
                                <PersonIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>Name</span>
                                    <input value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>

                            </div>
                            <div className='profile-page-right-ver-line'></div>
                            <div className='profile-page-right-input'>
                                <ApartmentIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>City</span>
                                    <input value={city} onChange={(e) => setCity(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>
                            </div>
                            <div className='profile-page-right-ver-line'></div>
                            <div className='profile-page-right-input'>
                                <ApartmentIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>State</span>
                                    <input value={state} onChange={(e) => setState(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>
                            </div>
                            <div className='profile-page-right-ver-line'></div>
                            <div className='profile-page-right-input'>
                                <RoomIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>Address</span>
                                    <input value={street} onChange={(e) => setStreet(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>
                            </div>
                            <div className='profile-page-right-ver-line'></div>
                            <div className='profile-page-right-input'>
                                <FlagIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>Country</span>
                                    <input value={country} onChange={(e) => setCountry(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>
                            </div>
                            <div className='profile-page-right-ver-line'></div>
                            <div className='profile-page-right-input'>
                                <QrCodeIcon sx={{ transform: "translateY(40%)", fontSize: "30px", marginLeft: "1rem", color: "var(--profile-page-icons)" }} />
                                <div>
                                    <span>Zip Code</span>
                                    <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={!editMode} style={{ outline: editMode ? "1px solid black" : "none" }} />
                                </div>
                            </div>
                            <div className='profile-page-right-ver-line'></div>

                            <div className='profile-page-button'>
                                <button onClick={() => setEditMode(true)} style={{ display: editMode ? 'none' : 'block' }}>Edit</button>
                                <button onClick={() => { setEditMode(false); updateUserDetails(); }} style={{ display: editMode ? 'block' : 'none' }}>Save</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default Profile