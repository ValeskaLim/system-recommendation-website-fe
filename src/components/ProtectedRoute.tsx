import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider"
import { ROUTE_PATHS } from "../router/routePaths";

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, users } = useAuth();

    if(!users && !isAuthenticated) {
        return <Navigate to={ROUTE_PATHS.LOGIN} replace/>
    }

    return children;
}

export default ProtectedRoute;