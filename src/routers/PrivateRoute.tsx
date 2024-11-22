import React from "react";
import {Navigate} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

interface Props {
    element: React.ReactElement;
}
const PrivateRoute = ({element} : Props) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
        return <Navigate to={"/module/login"} replace/>
    }

    try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp < currentTime) {
            return <Navigate to="/module/login" replace />;
        }

    } catch (error) {
        return <Navigate to="/module/login" replace />;
    }

    return element;
}

export default PrivateRoute;