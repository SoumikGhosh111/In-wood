import axios from "axios";

export const verifyAdmin = async( ) => { 
    try {
        const res = await axios.post(
            "http://localhost:8000/api/users/get-user",
            {
                token: localStorage.getItem("token")
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}` // Correct syntax for setting Authorization header
                }
            }
        );
        if (res.data.success && res.data.data.user.role === "admin") {
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
        localStorage.removeItem("token");
        console.log(error);
    }
}