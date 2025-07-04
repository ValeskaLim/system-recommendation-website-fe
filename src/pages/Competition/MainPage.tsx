import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { ROUTE_PATHS } from "../../router/routePaths";


const MainPage = () => {
    const { users } = useAuth();
    const location = useLocation();
    const { pathname } = location;

    return (
        <div className="flex flex-col">
            <h1 className="text-4xl mb-4">Competition List</h1>
            {users?.username === 'Admin' &&
                <NavLink to={ROUTE_PATHS.ADD_COMPETITION} className="block w-fit bg-blue-600 text-white p-3 rounded-lg duration-300 hover:bg-blue-700 hover:duration-300">Add competition</NavLink>
            }
            <div>

            </div>
        </div>
    )
}

export default MainPage;