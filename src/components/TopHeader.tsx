import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTE_PATHS } from "../router/routePaths";
import { useToast } from "../hooks/useToast";

const TopHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState<string>("");
    const { successToast } = useToast();

    useEffect(() => {
        const updateClock = () => {
            setCurrentTime(new Date().toLocaleTimeString());
        };
        updateClock();
        const timer = setInterval(updateClock, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleLogout = () => {
        logout();
        navigate(ROUTE_PATHS.LOGIN);
        successToast("Logged out!");
    };

    return (
        <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
            <div>Hello, <span className="font-semibold">{user?.fullname}</span></div>
            <div className="flex items-center gap-4">
                <span>{currentTime}</span>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default TopHeader;
