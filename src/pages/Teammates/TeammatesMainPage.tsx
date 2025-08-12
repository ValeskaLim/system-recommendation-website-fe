import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/AuthProvider";
import { MdDelete } from "react-icons/md";
import Swal from 'sweetalert2';

const FIELD_OF_PREFERENCE = [
  { label: "Data Science", value: "DS" },
  { label: "Web Development", value: "WD" },
  { label: "Mobile Development", value: "MD" },
  { label: "Game Development", value: "GD" },
  { label: "Cyber Security", value: "CS" },
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Machine Learning", value: "ML" },
];

const TeammatesMainPage = () => {
  const [teammates, setTeammates] = useState([]);
  const [isLeader, setIsLeader] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [error, setError] = useState(null);
  const [isJoinedTeam, setIsJoinedTeam] = useState(false);

  const { errorToast, successToast } = useToast();
  const { users } = useAuth();

  const getFieldLabels = (valueString) => {
    if (!valueString) return [];
    const codes = valueString.split(",");
    return codes
      .map((code) => {
        const match = FIELD_OF_PREFERENCE.find(
          (item) => item.value === code.trim()
        );
        return match ? match.label : code;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post(CommonConstant.CheckIsHaveTeam);
        const hasTeam = response1.data.success;
        setIsJoinedTeam(hasTeam);

        if (hasTeam) {
          const response2 = await axios.post(CommonConstant.TeammatesList, {});

          const member_id = response2.data.data.member_id;
          const memberIds = member_id.split(",").map(id => id.trim());;

          const userPromises = memberIds.map(async (id) => {
            const response = await axios.post(CommonConstant.GetUserById, { user_id: id });
            return response.data.data;
          });

          const users = await Promise.all(userPromises);
          setTeammates(users);

          const response3 = await axios.post(CommonConstant.CheckIsLeader);
          setIsLeader(response3.data.isLeader);
        }
      } catch (error) {
        console.log(error);
        errorToast("Error fetching teammates");
      }
    };

    if (users) {
      fetchData();
    }
  }, []);

  const deleteUser = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.RemoveUser, { user_id: String });

      if (response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        errorToast("Error deleting user");
      }
    } catch (error) {
      console.log(error);
      errorToast("Error deleting user");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(CommonConstant.CreateTeam, {
        team_name: teamName, leader_id: users?.user_id
      });

      if (response.data.success) {
        console.log(response.data.message);
        successToast(response.data.message);
      }
      else {
        console.log(error);
        errorToast(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      errorToast(error)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-4">Teammates List</h1>
      <hr className="text-gray-300" />
      {isJoinedTeam ?
        <>
          <ul className="list-none space-y-4">
            {teammates.map((user: any) => (
              <li
                key={user.user_id}
                className="w-1/2 border p-3 rounded-2xl flex justify-between"
              >
                <div>
                  <strong>{user.username}</strong> ({user.fullname})
                  {user.user_id === users?.user_id && (
                    <span className="text-blue-500"> (You)</span>
                  )}
                  <p>{user.email}</p>
                  <p>Semester: {user.semester}</p>
                  <div className="mt-5 grid grid-flow-col grid-rows-3 w-fit gap-1.5 overflow-hidden">
                    {getFieldLabels(user.field_of_preference).map((label, idx) => (
                      <span
                        key={idx}
                        className="cursor-default bg-blue-100 text-blue-700 px-2 py-2.5 rounded text-xs font-bold duration-300 hover:bg-blue-500 hover:duration-300 hover:text-white"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
                {user.user_id !== users?.user_id && isLeader && (
                  <div>
                    <div
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
                          await deleteUser(user.user_id);

                          await Swal.fire({
                            title: "Teammates Deleted!",
                            text: `${user.username} has been removed.`,
                            icon: "success",
                          });
                        }
                      }}
                      className="border border-red-500 bg-red-500 text-white p-2 rounded-xl duration-300 hover:text-red-500 hover:duration-300 hover:bg-white hover:border"
                    >
                      <MdDelete className="text-2xl" />
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {error && <p className="text-red-500">{error}</p>}
          {teammates.length === 0 && !error && <p>No teammates found.</p>}
        </>
        :
        <>
          <form onSubmit={handleSubmit}>
            <div className="mt-3">
              <h3 className="text-xl">You don't have team yet, want to create one?</h3>
              <div className="flex flex-col bg-gray-100 shadow-md p-3 mt-5 rounded-lg w-1/2 gap-3">
                <div className="flex justify-between items-center">
                  <p>Team Name:</p>
                  <input type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    name="teamName"
                    id="teamName"
                    className="w-3/4 text-md p-2 border border-[#e6e6e6] bg-white rounded-lg" />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer flex gap-2 group text-md items-center w-fit text-white bg-blue-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                                      hover:bg-blue-600 hover:duration-300"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>}
    </div>
  );
};

export default TeammatesMainPage;
