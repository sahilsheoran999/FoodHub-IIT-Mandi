import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ requiredRole }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to="/auth/login" />;
    }

    if (requiredRole && role !== requiredRole) {
        return <Navigate to="/denied" />;
    }

    return <Outlet />; 
}

export default RequireAuth;