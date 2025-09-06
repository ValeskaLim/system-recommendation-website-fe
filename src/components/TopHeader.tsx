import { useAuth } from "../hooks/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ROUTE_PATHS } from "../router/routePaths";
import { useToast } from "../hooks/useToast";
import RedButton from "./RedButton";
import WelcomeMessage from "./WelcomeMessage";

const TopHeader = () => {
  const { users, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState<string>("");
  const { successToast, errorToast } = useToast();

  useEffect(() => {
    const updateClock = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTE_PATHS.LOGIN);
      successToast("Logged out!");
    } catch (error) {
      console.log(error);
      errorToast("Failed to log out");
    }
  };

  return (
    <header className="bg-gray-100 p-4 flex justify-between items-center shadow">
      <div>
         <WelcomeMessage user={users?.fullname} />
      </div>
      <div className="flex items-center gap-4">
        <span>{currentTime}</span>
        <RedButton label="Logout" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default TopHeader;
