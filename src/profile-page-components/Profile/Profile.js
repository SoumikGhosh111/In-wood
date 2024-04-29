import React, { useState, useEffect } from 'react';
import "./Profile.css";
import background from "../../assets/abc.jpg";
import { getUser } from '../../functions/veifyUser';
import { useLocation } from 'react-router-dom';
import axios from 'axios';


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
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);

    return (
        <>
            {/* <h1 className='profile-page-title'>EDIT PROFILE</h1> */}
            <div className='profile-page-wrapper'>

                <div className='profile-page-left'>
                    <div className='profile-img'>
                        <img src={profileImg ? profileImg : background} alt="Profile Background" accept='.jpeg, .png, .jpg' />
                    </div>
                    {imageChange && (
                        <input type="file" onChange={(e) => handleImageChange(e)} accept="image/" />
                    )}
                    <button onClick={() => setImageChange(true)} style={{ display: imageChange ? 'none' : 'block' }}>Upload Image</button>
                    <button onClick={() => { setImageChange(false); updateProfilePicture() }} style={{ display: imageChange ? 'block' : 'none' }}>Save Image</button>

                </div>
                <div className='profile-page-right'>
                    <div className='profile-page-right-input'>
                        <span>Name</span>
                        <input value={userName} onChange={(e) => setUserName(e.target.value)} disabled={!editMode} />
                    </div>
                    <div className='profile-page-right-input'>
                        <span>City</span>
                        <input value={city} onChange={(e) => setCity(e.target.value)} disabled={!editMode} />
                    </div>
                    <div className='profile-page-right-input'>
                        <span>State</span>
                        <input value={state} onChange={(e) => setState(e.target.value)} disabled={!editMode} />
                    </div>
                    <div className='profile-page-right-input'>
                        <span>Address</span>
                        <input value={street} onChange={(e) => setStreet(e.target.value)} disabled={!editMode} />
                    </div>
                    <div className='profile-page-right-input'>
                        <span>Country</span>
                        <input value={country} onChange={(e) => setCountry(e.target.value)} disabled={!editMode} />
                    </div>
                    <div className='profile-page-right-input'>
                        <span>Zip Code</span>
                        <input value={zipCode} onChange={(e) => setZipCode(e.target.value)} disabled={!editMode} />
                    </div>

                    <button onClick={() => setEditMode(true)} style={{ display: editMode ? 'none' : 'block' }}>Edit</button>
                    <button onClick={() => { setEditMode(false); updateUserDetails(); }} style={{ display: editMode ? 'block' : 'none' }}>Save</button>
                </div>
            </div>
        </>
    )
}

export default Profile