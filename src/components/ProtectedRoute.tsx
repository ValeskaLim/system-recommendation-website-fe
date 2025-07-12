import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"
import { ROUTE_PATHS } from "../router/routePaths";

const ProtectedRoute = ({ children, requiredRole = 'normal' }) => {
    const { isAuthenticated, users } = useAuth();

    if(!users && !isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace/>
    }

    if(requiredRole === 'admin' && users?.role !== 'admin') {
        return <Navigate to={ROUTE_PATHS.HOME} replace/>
    }

    return children;
}

export default ProtectedRoute;