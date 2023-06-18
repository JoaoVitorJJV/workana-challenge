import { Navigate } from "react-router-dom";
import { useEffect } from "react";


const Logout = () => {
    const handlerLogout = () => {
        localStorage.clear();
    }

    useEffect(() => {
        handlerLogout()
    }, [])

    return <Navigate to="/auth/login" replace />
}

export default Logout;