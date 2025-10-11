import { useAuth } from "../hooks/AuthProvider";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTE_PATHS } from "../router/routePaths";
import { useToast } from "../hooks/useToast";
import RedButton from "./RedButton";

const TopHeader = () => {
  const { users, logout } = useAuth();
  const navigate = useNavigate();
  const { successToast, errorToast } = useToast();

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
    <header className="p-3 flex justify-between items-center shadow bg-stone-50">
      <div className="w-[77%] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="w-[50px] h-[50px]" />
          <h2 className="text-2xl font-bold">SUNIB Hall</h2>
        </div>
        <div>
          <nav>
            <ul className="flex gap-5">
              <li className="items-center flex">
                <NavLink
                  to={ROUTE_PATHS.HOME}
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/teammates"
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  Teammates List
                </NavLink>
              </li>
              <li className="items-center flex">
                <NavLink
                  to={ROUTE_PATHS.COMPETITION}
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  Competitions
                </NavLink>
              </li>
              <li className="items-center flex">
                <NavLink
                  to={ROUTE_PATHS.FIND}
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  Find
                </NavLink>
              </li>
              <li className="items-center flex">
                <NavLink
                  to={`${ROUTE_PATHS.PROFILE}?id=${users?.user_id}`}
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  Your Profile
                </NavLink>
              </li>
              {users?.role === "admin" && (
                <li className="items-center flex">
                <NavLink
                  to={`${ROUTE_PATHS.VIEW_FINALIZED}`}
                  className="font-semibold h-full items-center flex px-2 duration-300 hover:text-gray-600 hover:duration-300"
                >
                  View Finalized
                </NavLink>
              </li>
              )}
            </ul>
          </nav>
        </div>
        <div>
          <RedButton label="Logout" onClick={handleLogout} />
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
