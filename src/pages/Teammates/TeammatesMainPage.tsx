import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { useAuth } from "../../hooks/AuthProvider";
import BlueButton from "../../components/BlueButton";
import GreenButton from "../../components/GreenButton";
import { ROUTE_PATHS } from "../../router/routePaths";
import { useNavigate } from "react-router-dom";
import BlueLabel from "../../components/BlueLabel";

const TeammatesMainPage = () => {
  const [teammates, setTeammates] = useState([]);
  const [teamCompetition, setTeamCompetition] = useState<any | undefined>();
  const [isLeader, setIsLeader] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [teamId, setTeamId] = useState("");
  const [error, setError] = useState(null);
  const [isJoinedTeam, setIsJoinedTeam] = useState(false);
  const [isTeamFinalized, setIsTeamFinalized] = useState(false);
  const [skillOptions, setSkillOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const { errorToast, successToast, warningToast } = useToast();
  const { users } = useAuth();
  const navigate = useNavigate();

  const getFieldLabels = (valueString) => {
    if (!valueString) return [];
    const codes = valueString.split(",");
    return codes
      .map((code) => {
        const match = skillOptions.find((item) => item.value === code.trim());
        return match ? match.label : code;
      })
      .filter(Boolean);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.post(CommonConstant.CheckIsHaveTeam);
        const hasTeam = response1.data.success;
        setIsJoinedTeam(response1.data.success);

        if (hasTeam) {
          const response2 = await axios.post(CommonConstant.TeammatesList, {});

          const result_teammates = response2.data.data;
          const member_id = result_teammates.member_id;
          const memberIds = member_id.split(",").map((id) => id.trim());
          setIsTeamFinalized(response2.data.data.is_finalized);

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

    const fetchSkillsets = async () => {
      try {
        const response = await axios.post(CommonConstant.GetAllSkillsets);
        if (response.data.success) {
          const skillsets = response.data.data || [];

          const options = skillsets.map((item: any) => ({
            label: item.skill_name,
            value: item.skill_code,
          }));

          setSkillOptions(options);
        }
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error?.response?.data?.message || "Failed to fetch skillsets";
        errorToast(errorMessage);
      }
    };

    if (users) {
      fetchData();
      fetchSkillsets();
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

  const handleFinalizeTeam = async () => {
    try {
      const response = await axios.post(CommonConstant.FinalizeTeam, {
        team_id: teamId,
      });
      if (response.data.success) {
        successToast(response.data.message);
        setIsTeamFinalized(true);
      } else {
        errorToast(response.data.message);
      }
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      errorToast(errorMessage);
    }
  };

  const viewCompetitionDetail = (
    competitionData: any,
    competition_id: number
  ) => {
    navigate(`${ROUTE_PATHS.COMPETITION}/${competition_id}`, {
      state: { competition: competitionData },
    });
  };

  return (
    <div className="main-container">
      <div className="main-col-container">
        <hr className="text-gray-300" />
        <div className="w-full">
          {isJoinedTeam ? (
            <>
              <div className="flex justify-between">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h2 className="text-3xl">
                      Team Name:{" "}
                      <span className="font-semibold">{teamName}</span>
                    </h2>
                  </div>
                  <div>
                    {isLeader && (
                      <>
                        {isTeamFinalized ? (
                          <GreenButton
                            label="Team Finalized!"
                            extendedClassName="disabled:hover:bg-green-500"
                            disabled
                          />
                        ) : (
                          <BlueButton
                            label="Finalize Team"
                            onClick={handleFinalizeTeam}
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex justify-between gap-5 mt-5">
                <ul className="list-none space-y-4 w-full">
                  {teammates.map((user: any) => (
                    <li
                      key={user.user_id}
                      className="card-container"
                    >
                      <div>
                        <strong>{user.username}</strong> ({user.fullname})
                        {user.user_id === users?.user_id && (
                          <span className="text-blue-500"> (You)</span>
                        )}
                        <p>{user.email}</p>
                        <p>Semester: {user.semester}</p>
                        <a
                          href={user.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 break-all"
                        >
                          {user.portfolio == null
                            ? "-"
                            : user.portfolio.substring(0, 50)}
                        </a>
                        <div className="mt-5 w-fit gap-2 flex">
                          {getFieldLabels(user.field_of_preference).map(
                            (label, idx) => (
                              <BlueLabel text={label} key={idx} />
                            )
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <ul className="w-full">
                  <li className="card-container">
                    {teamCompetition !== undefined &&
                    teamCompetition !== null ? (
                      <>
                        <div className="w-full h-full">
                          <img
                            src={`${CommonConstant.ImageSource}${teamCompetition.poster}`}
                            alt={teamCompetition.title}
                            className="w-full max-h-[300px] object-cover rounded-t-2xl"
                          />
                        </div>
                        <p className="font-semibold text-3xl h-[44px] items-center flex mt-5">
                          {teamCompetition.title}
                        </p>
                        <div className="flex justify-between">
                          <div className="w-1/2">
                            <p className="text-md mt-2">Date</p>
                            <p>Min member</p>
                            <p>Max member</p>
                            <p>Status</p>
                          </div>
                          <div className="w-3/4">
                            <p className="text-md mt-2">
                              :{" "}
                              {new Date(
                                teamCompetition.date
                              ).toLocaleDateString("en-US", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
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
                          </div>
                        </div>
                        <div className="mt-5">
                          <BlueButton
                            label="View details"
                            onClick={() =>
                              viewCompetitionDetail(
                                teamCompetition,
                                teamCompetition.id
                              )
                            }
                          />
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
    </div>
  );
};

export default TeammatesMainPage;
