// import { useNavigate } from 'react-router-dom'; // Import Navigate if you're using react-router-dom
import axios from 'axios'; 
import { baseUrl } from './baseUrl';

export const getUser = async () => {
    try {
        const res = await axios.post(
            `${baseUrl}/api/users/get-user`,
            {
                token: localStorage.getItem("token")
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Correct syntax for setting Authorization header
                }
            }
        );
        if (res.data.success) {
            // alert("success"); 
            return true;  
        } else {
            localStorage.removeItem('token');
            // alert("not success");
            return false;  
             
            // Redirect the user to the login page programmatically
            // Example assuming you're using react-router-dom
            // history.push("/login");
        }
    } catch (error) {
        localStorage.clear();
        console.log(error);
    }
};