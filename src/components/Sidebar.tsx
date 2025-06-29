function Sidebar() {
    return (
        <div>
            <div className="w-64 h-screen bg-gray-800 text-white p-4">
                <h2 className="text-2xl font-bold mb-4">Sidebar</h2>
                <ul className="space-y-2">
                    <li><a href="#" className="hover:text-gray-400">Home</a></li>
                    <li><a href="#" className="hover:text-gray-400">About</a></li>
                    <li><a href="#" className="hover:text-gray-400">Services</a></li>
                    <li><a href="#" className="hover:text-gray-400">Contact</a></li>
                </ul>
            </div>
            <div className="ml-64 p-4">
                <h1 className="text-3xl font-bold">Main Content Area</h1>
                <p>This is where the main content will go.</p>
            </div>
        </div>
    )
}

export default Sidebar;