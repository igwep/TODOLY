// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/UseAuth";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    const { user, userData } = useAuthContext();
    console.log('user data:', userData);
    if(!user){
        return <Navigate to="/" />
    }
    

    return children;

}

export default ProtectedRoute;