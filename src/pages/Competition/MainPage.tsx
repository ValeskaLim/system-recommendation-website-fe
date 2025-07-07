    import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
    import { useAuth } from "../../hooks/AuthProvider";
    import { ROUTE_PATHS } from "../../router/routePaths";
    import axios from "axios";
    import CommonConstant from "../../constant/CommonConstant";
    import { useEffect, useState } from "react";
    import { useToast } from "../../hooks/useToast";


    const MainPage = () => {
        const [competitions, setCompetitions] = useState([]);
        const { users } = useAuth();
        const location = useLocation();
        const { pathname } = location;

        const { errorToast, successToast } = useToast();

        useEffect(() => {
            const fetchData = async () => {
                try {
                    const res = await axios.post(CommonConstant.GetAllCompetition);
                    setCompetitions(res.data.data);
                } catch (error) {
                    console.error("Error fetching competitions data");
                    errorToast("Error fetching competition data");
                }
            };

            fetchData();
        }, []);

        return (
            <div className="flex flex-col">
                <h1 className="text-4xl mb-4">Competition List</h1>
                {users?.username === 'Admin' &&
                    <NavLink to={ROUTE_PATHS.ADD_COMPETITION} className="block w-fit bg-blue-600 text-white p-3 rounded-lg duration-300 hover:bg-blue-700 hover:duration-300">Add competition</NavLink>
                }
                <div className="mt-4">
                    {competitions.length === 0 ? (
                        <p>No competitions available.</p>
                    ) : (
                        <ul className="space-y-2">
                            {competitions.map((comp, idx) => (
                                <li key={idx} className="border p-3 rounded shadow-sm">
                                    <div className="font-semibold">{comp.title}</div>
                                    <div className="text-sm text-gray-600">{comp.date}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        )
    }

    export default MainPage;