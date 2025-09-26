import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/AuthProvider";
import { MdDelete, MdCancelPresentation, MdSave } from "react-icons/md";
import Swal from "sweetalert2";
import { IoIosHeart } from "react-icons/io";
import { HiPencilAlt } from "react-icons/hi";
import RedButton from "../../components/RedButton";

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
  const [teamCompetition, setTeamCompetition] = useState<any | undefined>();
  const [isLeader, setIsLeader] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [originalTeamName, setOriginalTeamName] = useState("");
  const [error, setError] = useState(null);
  const [isJoinedTeam, setIsJoinedTeam] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const { errorToast, successToast, warningToast } = useToast();
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

          const result_teammates = response2.data.data;
          const member_id = result_teammates.member_id;
          const memberIds = member_id.split(",").map((id) => id.trim());

          const userPromises = memberIds.map(async (id) => {
            const response = await axios.post(CommonConstant.GetUserById, {
              user_id: id,
            });
            return response.data.data;
          });

          const users: any = await Promise.all(userPromises);
          setTeammates(users);

          const response3 = await axios.post(CommonConstant.CheckIsLeader);
          setIsLeader(response3.data.data.isLeader);

          const response4 = await axios.post(
            CommonConstant.GetCompetitionById,
            { id: result_teammates.competition_id }
          );
          const team_competition_result = response4.data.data;
          setTeamCompetition(team_competition_result);

          // Set the team name for editing
          setTeamName(result_teammates.team_name);

          // Set the team ID for editing
          setTeamId(result_teammates.team_id);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (users) {
      fetchData();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(CommonConstant.CreateTeam, {
        team_name: teamName,
        leader_id: users?.user_id,
      });

      if (response.data.success) {
        console.log(response.data.message);
        successToast(response.data.message);
      } else {
        console.log(error);
        errorToast(response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      errorToast(errorMessage);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-4">Teammates List</h1>
      <hr className="text-gray-300" />
      <div className="mt-7">
        {isJoinedTeam ? (
          <>
            <div className="flex justify-between">
              <div className="flex items-center">
                <h2 className="text-3xl">Team Name: </h2>
                <input
                  type="text"
                  name="teamName"
                  id="teamName"
                  value={teamName}
                  className="mx-3 w-fit text-2xl p-2 border border-[#e6e6e6] rounded-lg disabled:border-none"
                  disabled={!isEditMode}
                  size={teamName.length - 2}
                />
              </div>
            </div>
            <div className="flex justify-between gap-5 mt-5">
              <ul className="list-none space-y-4 w-full">
                {teammates.map((user: any) => (
                  <li
                    key={user.user_id}
                    className="p-3 rounded-2xl flex justify-between bg-neutral-100 shadow-lg"
                  >
                    <div>
                      <strong>{user.username}</strong> ({user.fullname})
                      {user.user_id === users?.user_id && (
                        <span className="text-blue-500"> (You)</span>
                      )}
                      <p>{user.email}</p>
                      <p>Semester: {user.semester}</p>
                      <div className="mt-5 grid grid-flow-col grid-rows-3 w-fit gap-1.5 overflow-hidden">
                        {getFieldLabels(user.field_of_preference).map(
                          (label, idx) => (
                            <span
                              key={idx}
                              className="cursor-default bg-blue-100 text-blue-700 px-2 py-2.5 rounded text-xs font-bold duration-300 hover:bg-blue-500 hover:duration-300 hover:text-white"
                            >
                              {label}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="w-full">
                <li className="p-3 rounded-2xl flex flex-col bg-neutral-100 shadow-lg">
                  {teamCompetition !== undefined && teamCompetition !== null ? (
                    <>
                      <p className="font-semibold text-2xl h-[44px] items-center flex">
                        {teamCompetition.title}
                      </p>
                      <div className="flex justify-between">
                        <div className="w-1/2">
                          <p className="text-md mt-2">Date</p>
                          <p>Min member</p>
                          <p>Max member</p>
                          <p>Status</p>
                          <p>Description</p>
                        </div>
                        <div className="w-3/4">
                          <p className="text-md mt-2">
                            :{" "}
                            {new Date(teamCompetition.date).toLocaleDateString(
                              "en-US",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>
                          <p>: {teamCompetition.min_member}</p>
                          <p>: {teamCompetition.max_member}</p>
                          <p
                            className={`${
                              teamCompetition.status == "INA"
                                ? "text-red-500"
                                : "text-green-500"
                            } font-semibold`}
                          >
                            <span className="text-black">: </span>
                            {teamCompetition.status == "INA"
                              ? "Inactive"
                              : "Active"}
                          </p>
                          <p>
                            : {teamCompetition.description.substring(0, 200)}...
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p>No competition found</p>
                  )}
                </li>
              </ul>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {teammates.length === 0 && !error && <p>No teammates found.</p>}
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <div className="mt-3 w-1/2">
                <h3 className="text-xl">
                  You don't have team yet, want to create one?
                </h3>
                <div className="flex flex-col bg-gray-100 shadow-md p-3 mt-5 rounded-lg gap-3">
                  <div className="flex justify-between items-center">
                    <p>Team Name:</p>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      name="teamName"
                      id="teamName"
                      className="w-3/4 text-md p-2 border border-[#e6e6e6] bg-white rounded-lg"
                    />
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
          </>
        )}
      </div>
    </div>
  );
};

export default TeammatesMainPage;
