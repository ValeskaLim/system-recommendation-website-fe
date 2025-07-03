import { NavLink } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white py-4">
            <h2 className="pl-4 text-xl font-bold mb-4">My App</h2>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/home" className={({ isActive }) => 
                            `flex w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300 ${isActive ? 'bg-blue-400' : ''}`}><FaHome className='text-2xl mr-2'/>Home</NavLink>
                    </li>
                    <li><NavLink to="/profile" className="block w-full py-2 pl-4 duration-300 hover:bg-blue-400 hover:duration-300">Profile</NavLink></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
