import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
            <h2 className="text-xl font-bold mb-4">My App</h2>
            <nav>
                <ul className="space-y-2">
                    <li><Link to="/home" className="hover:underline">Home</Link></li>
                    <li><Link to="/profile" className="hover:underline">Profile</Link></li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
