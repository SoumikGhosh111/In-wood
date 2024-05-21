import React, { useEffect } from 'react';
import { useUserContext } from '../functions/useUserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import { baseUrl } from '../functions/baseUrl';

const AdminRoute = ({ children }) => {
    const { user, setUser } = useUserContext();

    useEffect(() => {
        const getUser = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    return <Navigate to="/login" />;
                }

                const response = await axios.post(
                    `${baseUrl}/api/users/get-user`,
                    { token },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                if (response.data.success && response.data.data.user.role === "admin") {
                    setUser(response.data.data);
                } else {
                    return <Navigate to="/" />;
                }
            } catch (error) {
                console.error("Error fetching user:", error);
                localStorage.clear();
                return <Navigate to="/login" />;
            }
        };

        if (!user) {
            getUser();
        }
    }, [user, setUser]);

    const handleHomeButtonClick = ( ) => { 
        window.location.href = '/';

        // Clearing the browser's history
        window.history.replaceState(null, '', '/');
    }

    // Render children only if user is authenticated and has admin role
    if (user && user.user.role === "admin") {
        return children;
    } else {
        return (
            // <>
            //     <h1>Not  a Valid Admin</h1>
            //     <button onClick={handleHomeButtonClick}>Go Back to Home</button>
            // </>
            <NotFound />
        ); 
    }
};

export default AdminRoute;
