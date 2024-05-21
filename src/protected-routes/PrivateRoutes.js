import React, { useEffect, useState } from 'react'
import { useUserContext } from '../functions/useUserContext';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { baseUrl } from '../functions/baseUrl';

export default function ProtectedRoutes({children}) {
    const {user, setUser} = useUserContext();

    const getUser = async () => {
        try {
            const res = await axios.post(
                `${baseUrl}/api/users/get-user`,{
                token: localStorage.getItem("token")
            }, { 
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
            }
            )
            if(res.data.success){
                setUser(res.data.data)
                console.log(res.data.data.user.role)
                if (res.data.data.user.role !== "admin") {
                    return <Navigate to="/" />;
                }
            } else{
                <Navigate to="/login"/>
                localStorage.clear()
            }
        } catch (error) {
            localStorage.clear();
            console.log(error)
        }
    }

    useEffect(() => {
        if(!user){
            getUser()
        }
    }, [user])

    if(localStorage.getItem("token")){
        return children
    } else{
        return <Navigate to="/login" />
    }
}