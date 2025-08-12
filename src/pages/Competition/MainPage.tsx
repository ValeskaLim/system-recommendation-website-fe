import {
  Link,
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuth } from "../../hooks/AuthProvider";
import { ROUTE_PATHS } from "../../router/routePaths";
import axios from "axios";
import CommonConstant from "../../constant/CommonConstant";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import { IoIosHeart } from "react-icons/io";
import Swal from "sweetalert2";

const STATUS_LIST = [
  { label: "Active", value: "ACT" },
  { label: "Inactive", value: "INA" },
];

const MainPage = () => {
  const [competitions, setCompetitions] = useState([]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [teamData, setTeamData] = useState(undefined);
  const { users } = useAuth();
  const location = useLocation();
  const { pathname } = location;

  const { errorToast, successToast } = useToast();

  const navigate = useNavigate();

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

    const fetchTeamData = async () => {
      try {
        const response = await axios.post(CommonConstant.TeammatesList)
        if(response.data.success) {
          setTeamData(response.data.data.competition_id);
          if(response.data.data.competition_id !== null) {
            setIsWishlisted(true);
          }
        }
      } catch (error: any) {
        console.error(error);
        errorToast(error);
      }
    }

    fetchTeamData();
    fetchData();
  }, []);

  const getStatusLabel = (code) => {
    const match = STATUS_LIST.find((item) => item.value === code);
    return match ? match.label : code;
  };

  const deleteCompetition = async (competition_id) => {
    try {
      const response = await axios.post(CommonConstant.RemoveCompetition, {
        competition_id,
      });

      if (response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        errorToast("Error deleting competition");
      }
    } catch (error) {
      console.log(error);
      errorToast("Error deleting competition");
    }
  };

  const handleWishlist = async (competition_id) => {
    try {
      const response = await axios.post(CommonConstant.AddWishlistCompetition, {competition_id: competition_id})
      if(response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setIsWishlisted(true);
        successToast(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(error)
    }
  }

  const handleRemoveWishlist = async (competition_id) => {
    try {
      const response = await axios.post(CommonConstant.RemoveWishlistCompetition, {competition_id: competition_id})
      if(response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        setIsWishlisted(false);
        successToast(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(error)
    }
  }

  console.log('wishlist',isWishlisted);

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-4">Competition List</h1>
      {users?.role === "admin" && (
        <NavLink
          to={ROUTE_PATHS.ADD_COMPETITION}
          className="block w-fit bg-blue-600 text-white p-3 rounded-lg duration-300 font-semibold hover:bg-blue-700 hover:duration-300"
        >
          Add competition
        </NavLink>
      )}
      <div className="mt-10">
        {competitions.length === 0 ? (
          <p>No competitions available.</p>
        ) : (
          <ul className="space-y-2 grid grid-cols-3 gap-2">
            {competitions.map((comp: any, idx) => (
              <>
                <div>
                  <li key={idx} className="border p-3 rounded-xl shadow-sm h-full">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-xl">{comp.title}</h3>
                        <p className="text-gray-600">
                          {new Date(comp.date).toLocaleString("id-ID", {
                            dateStyle: "long",
                          })}
                        </p>
                        <p>Slot: {comp.slot}</p>
                        <p className="mt-3">{comp.description.length > 170 ? `${comp.description.substring(0, 100)}...` : comp.description}</p>
                      </div>
                      <div>
                        <div
                          className={`cursor-default px-2 py-1 rounded-md font-semibold border-2 ${comp.status === "ACT"
                              ? " text-green-600 border-green-600"
                              : "text-gray-500 border-gray-500"
                            }`}
                        >
                          {getStatusLabel(comp.status)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {users?.role === "admin" && (
                        <>

                          <button onClick={() => navigate(`${ROUTE_PATHS.EDIT_COMPETITION}/${comp.competition_id}`)} className="cursor-pointer font-semibold bg-blue-500 text-white py-1 px-3 rounded-md duration-300 hover:bg-blue-600 hover:duration-300">
                            Edit
                          </button>
                          <button
                            onClick={async () => {
                              const result = await Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#3085d6",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Remove",
                              });

                              if (result.isConfirmed) {
                                await deleteCompetition(comp.competition_id);

                                await Swal.fire({
                                  title: "Competition Removed!",
                                  text: `${comp.title} has been removed.`,
                                  icon: "success",
                                });
                              }
                            }}
                            className="cursor-pointer font-semibold bg-red-500 text-white py-1 px-3 rounded-md duration-300 hover:bg-red-600 hover:duration-300"
                          >
                            Delete
                          </button>
                        </>
                      )}
                      <button onClick={() => isWishlisted ? handleRemoveWishlist(comp.competition_id) : handleWishlist(comp.competition_id)} className={`cursor-pointer flex items-center font-semibold bg-yellow-400 py-1 px-3 rounded-md duration-300 hover:bg-yellow-500 hover:duration-300 ${teamData == comp.competition_id ? 'text-red-500' : 'text-white'}`}>
                        <IoIosHeart className="text-lg"/>
                      </button>
                    </div>
                  </li>
                </div>
              </>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainPage;
