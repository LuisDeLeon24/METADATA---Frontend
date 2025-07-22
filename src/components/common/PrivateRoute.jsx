import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const PrivateRoute = ({ allowedRoles }) => {
    const { user } = useContext(UserContext);

    // Si no hay sesión activa, redirigir al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario pero no tiene permisos
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />;
    }

    // Usuario permitido
    return <Outlet />;
};

export default PrivateRoute;