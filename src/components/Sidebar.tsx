import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";
import { IoPersonCircle, IoPeopleSharp  } from "react-icons/io5";
import { PiTargetBold } from "react-icons/pi";
import { ROUTE_PATHS } from '../router/routePaths';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white py-4">
            <h2 className="pl-4 text-2xl font-bold mb-6">SUNIB Hall</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/profile" className={({ isActive }) =>
                            `flex w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300 ${isActive ? 'bg-blue-400' : ''}`}><IoPersonCircle className='text-2xl mr-2' />
                            Profile</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTE_PATHS.HOME} className={({ isActive }) =>
                            `flex w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300 ${isActive ? 'bg-blue-400' : ''}`}><FaHome className='text-2xl mr-2' />
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/teammates" className={({ isActive }) =>
                            `flex w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300 ${isActive ? 'bg-blue-400' : ''}`}><IoPeopleSharp className='text-2xl mr-2' />
                            Teammates List</NavLink>
                    </li>
                    <li>
                        <NavLink to={ROUTE_PATHS.COMPETITION} className={({ isActive }) =>
                            `flex w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300 ${isActive ? 'bg-blue-400' : ''}`}><PiTargetBold className='text-2xl mr-2' />
                            Competitions</NavLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
