import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../../hooks/AuthProvider";
import Swal from "sweetalert2";
import BlueButton from "../../components/BlueButton";
import GreenButton from "../../components/GreenButton";
import RedButton from "../../components/RedButton";
import ProgressCircle from "../../components/ProgressCircle";

const RecommendationPage = () => {
  const [inviteesUser, setinviteesUser] = useState([]);
  const [invitesUser, setinvitesUser] = useState([]);
  const [memberLength, setMemberLength] = useState();
  const [isIgnoreSemester, setisIgnoreSemester] = useState(false);
  const [isIgnoreGender, setisIgnoreGender] = useState(false);
  const [isRunRecommend, setIsRunRecommend] = useState(false);
  const [recommendUsers, setRecommendUsers] = useState([]);
  const [isJoinCompetition, setIsJoinCompetition] = useState(false);
  const [maxMember, setMaxMember] = useState(null);
  const [invitationNumber, setInvitationNumber] = useState(null);
  const [specificPreference, setSpecificPreference] = useState("");
  const [skillOptions, setSkillOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { successToast, errorToast } = useToast();

  const invitationNumberLeft =
    (maxMember ?? 0) - ((invitationNumber ?? 0) + (memberLength ?? 0));

  const { users } = useAuth();

  const inviteeIds = inviteesUser.map((invitee) => invitee.invitee_id);

  useEffect(() => {
    const fetchinviteesUser = async () => {
      const response = await axios.post(CommonConstant.GetInviteesUser);
      try {
        if (response.data.success) {
          const inviteesUser = response.data.data || [];
          setinviteesUser(inviteesUser);
        }
      } catch (error: any) {
        console.log(error);
        errorToast(error);
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

    const fetchinvitesUser = async () => {
      const response = await axios.post(CommonConstant.GetInvitesUser);
      try {
        if (response.data.success) {
          const invitesUser = response.data.data || [];
          setinvitesUser(invitesUser);
        }
      } catch (error: any) {
        console.log(error);
        errorToast(error);
      }
    };

    const fetchTeammates = async () => {
      try {
        const response = await axios.post(CommonConstant.TeammatesList, {});
        const member_id = response.data.data.member_id;
        const memberIds = member_id.split(",");
        const member_length = memberIds.length;
        fetchCompetitionData(response.data.data.competition_id);
        setMemberLength(member_length);
      } catch (error: any) {
        console.log(error);
        errorToast(error);
      }
    };

    const fetchTeamData = async () => {
      try {
        const response = await axios.post(
          CommonConstant.CheckAnyCompetitionsJoined
        );
        setIsJoinCompetition(response.data.data.hasJoined);
      } catch (error: any) {
        console.log(error);
        const errorMessage = error.response.data.message;
        errorToast(errorMessage);
      }
    };

    const fetchCompetitionData = async (id: number) => {
      try {
        const response = await axios.post(CommonConstant.GetCompetitionById, {
          id: id,
        });
        setMaxMember(response.data.data.max_member);
      } catch (error: any) {
        console.log(error);
        const errorMessage = error.response.data.message;
        errorToast(errorMessage);
      }
    };

    const checkInvitationNumber = async () => {
      try {
        const response = await axios.post(
          CommonConstant.CheckNumberInvitations
        );
        if (response.data.success) {
          setInvitationNumber(response.data.data.count);
        }
      } catch (error: any) {
        console.log(error);
        const errorMessage = error.response.data.message;
        errorToast(errorMessage);
      }
    };

    fetchTeammates();
    fetchinviteesUser();
    fetchinvitesUser();
    fetchTeamData();
    checkInvitationNumber();
    fetchSkillsets();
  }, []);

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

  const isMaxInvite = () => {
    if (inviteesUser.length === 2) {
      return true;
    }

    return false;
  };

  const processRecommend = async (e) => {
    e.preventDefault();

    if (!isJoinCompetition) {
      errorToast("Cannot use recommendation, please join a competition first");
      return;
    }

    if (users !== null) {
      try {
        const response = await axios.post(CommonConstant.Recommendation, {
          user_id: users.user_id,
          ignore_gender: isIgnoreGender,
          ignore_semester: isIgnoreSemester,
        });
        console.log(response.data);
        setRecommendUsers(response.data.data);
        setIsRunRecommend(true);
      } catch (error: any) {
        console.log(error);
        const errorMessage = error.response.data.message;
        errorToast(errorMessage);
      }
    } else {
      errorToast("Current user is not found");
    }
  };

  const handleReset = () => {
    setIsRunRecommend(false);
    setisIgnoreGender(false);
    setisIgnoreSemester(false);
  };

  const removeUser = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.RemoveUserInvitation, {
        user_id: user_id,
      });
      if (response.data.success) {
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        errorToast("Error removing user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInviteUser = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.InviteUser, {
        user_id: user_id,
      });
      if (response.data.success) {
        successToast(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        errorToast("Error inviting user");
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response.data.message;
      errorToast(errorMessage);
    }
  };

  const handleAcceptInvitation = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.AcceptInvites, {
        user_id: user_id,
      });
      if (response.data.success) {
        successToast(response.data.messages);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRejectInvitation = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.RejectInvites, {
        user_id: user_id,
      });
      if (response.data.success) {
        console.log(response.data.messages);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <h1 className="font-bold text-4xl">Recommendation</h1>
        <form onSubmit={processRecommend}>
          <div className="mt-4 flex items-center border rounded-md p-3 gap-10">
            <div className="gap-2 flex">
              <input
                type="checkbox"
                checked={isIgnoreGender}
                onChange={(e) => setisIgnoreGender(e.target.checked)}
                disabled={memberLength == 3}
              />
              <p>Ignore gender</p>
            </div>
            <div className="gap-2 flex">
              <input
                type="checkbox"
                checked={isIgnoreSemester}
                onChange={(e) => setisIgnoreSemester(e.target.checked)}
                disabled={memberLength == 3}
              />
              <p>Ignore semester</p>
            </div>
            <div>
              <select
                name="gender"
                id="gender"
                value={specificPreference}
                onChange={(e) => setSpecificPreference(e.target.value)}
                className="p-1 border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              >
                <option value="" hidden>
                  Specific Skillset (optional)
                </option>
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <button
              type="submit"
              className="cursor-pointer flex gap-2 group text-lg items-center w-fit text-white bg-blue-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-blue-600 hover:duration-300 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={memberLength == 3}
            >
              Recommend
              <IoSettingsSharp className="text-2xl duration-300 group-hover:rotate-90 group-hover:duration-300 group-disabled:rotate-0" />
            </button>
            <RedButton
              label="Reset"
              onClick={handleReset}
              className="cursor-pointer flex gap-2 group text-lg items-center w-fit text-white bg-red-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-red-600 hover:duration-300 disabled:cursor-not-allowed disabled:bg-red-300"
              disabled={isRunRecommend == false}
            />
          </div>
        </form>
        {isRunRecommend ? (
          <>
            <div>
              <h3 className="mt-5 text-2xl font-semibold">
                Top 3 users that matches with you
              </h3>
              <ul className="grid grid-cols-3 gap-4">
                {recommendUsers.map((user: any) => (
                  <li
                    key={user.user_id}
                    className="flex flex-col justify-between p-3 rounded-2xl bg-neutral-100 shadow-lg"
                  >
                    <div>
                      <div className="flex justify-between">
                        <div className="">
                          <p>Fullname</p>
                          <p>Username</p>
                          <p>Gender</p>
                          <p>Semester</p>
                          <p>Portfolio</p>
                        </div>
                        <div className="w-1/2">
                          <p>: {user.fullname}</p>
                          <p>: {user.username}</p>
                          <p>
                            : {user.gender == "L" ? "Laki-laki" : "Perempuan"}
                          </p>
                          <p>: {user.semester}</p>
                          <a href={user.portfolio} target="_blank" rel="noopener noreferrer" className="break-all">: <span className="text-blue-500 hover:text-blue-700">{user.portfolio == null ? "-" : user.portfolio.substring(0, 40) + "..."}</span></a>
                        </div>
                        <ProgressCircle
                          percentage={Number(
                            (user.similarity * 100).toFixed(1)
                          )}
                        />
                      </div>
                      <div className="mt-5 grid grid-cols-3 w-full gap-4 overflow-hidden">
                        {getFieldLabels(user.field_of_preference).map(
                          (label, idx) => (
                            <span
                              key={idx}
                              className="text-center cursor-default bg-blue-100 text-blue-700 px-2 py-2.5 rounded text-xs font-bold duration-300 hover:bg-blue-500 hover:duration-300 hover:text-white"
                            >
                              {label}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                      <BlueButton
                        label="Invite"
                        onClick={() => handleInviteUser(user.user_id)}
                        className="mt-2 cursor-pointer flex gap-2 group text-sm items-center w-fit text-white bg-blue-300 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        enabled:bg-blue-500 disabled:cursor-not-allowed enabled:hover:bg-blue-600 hover:duration-300"
                        disabled={
                          inviteeIds.includes(user.user_id) ||
                          invitationNumberLeft === 0
                        }
                      />
                      {inviteeIds.includes(user.user_id) && (
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
                              await removeUser(user.user_id);

                              await Swal.fire({
                                title: "Invitation Deleted!",
                                text: `${user.username} has been removed.`,
                                icon: "success",
                              });
                            }
                          }}
                          className="mt-2 cursor-pointer flex gap-2 group text-sm items-center w-fit text-white bg-red-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-red-600 hover:duration-300"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-5 text-2xl font-semibold">Your invitees:</h3>
            <p className="text-md font-semibold text-red-500 italic">
              **Currently you have{" "}
              <span
                className={
                  invitationNumberLeft === 0 ? "text-red-500" : "text-green-500"
                }
              >
                {invitationNumberLeft === 0 ? "0" : invitationNumberLeft ?? 0}
              </span>{" "}
              invitations left**
            </p>
            <div className="mt-3 space-y-2 grid grid-cols-3 gap-2">
              {inviteesUser.map((user: any, idx) => (
                <li
                  key={idx}
                  className="flex flex-col border p-3 rounded-xl shadow-sm h-full"
                >
                  <div className="flex justify-between w-full">
                    <div className="w-full mr-5">
                      <h3 className="font-semibold text-xl">
                        {user.invitee.username}
                      </h3>
                      <p className="flex justify-between">
                        <span>Gender:</span>
                        <span className="w-3/5">
                          {" "}
                          {user.invitee.gender == "L"
                            ? "Laki-laki"
                            : "Perempuan"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Email:</span>
                        <span className="w-3/5">{user.invitee.email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Semester:</span>
                        <span className="w-3/5">{user.invitee.semester}</span>
                      </p>
                      <p className="mt-2">Field of interest: </p>
                    </div>

                    <div className="flex items-center cursor-default px-2 py-1 h-fit rounded-md font-semibold border-2 text-red-600 border-red-600">
                      Pending
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mt-1 gap-1.5 overflow-hidden">
                    {getFieldLabels(user.invitee.field_of_preference).map(
                      (label, idx) => (
                        <span
                          key={idx}
                          className="flex w-full items-center cursor-default bg-blue-100 text-blue-700 px-2 py-2.5 rounded text-xs font-bold duration-300 hover:bg-blue-500 hover:duration-300 hover:text-white"
                        >
                          {label}
                        </span>
                      )
                    )}
                  </div>
                  <div>
                    <RedButton
                      label="Remove"
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
                          await removeUser(user.invitee_id);

                          await Swal.fire({
                            title: "Teammates Deleted!",
                            text: `${user.invitee.username} has been removed.`,
                            icon: "success",
                          });
                        }
                      }}
                      extendedClassName="mt-3"
                    />
                  </div>
                </li>
              ))}
            </div>
            <hr className="mt-5 text-gray-300" />
            <h3 className="mt-5 text-2xl font-semibold">Your invites:</h3>
            <div className="mt-3 space-y-2 grid grid-cols-3 gap-2">
              {invitesUser.map((user: any, idx) => (
                <li
                  key={idx}
                  className="flex flex-col border p-3 rounded-xl shadow-sm h-full"
                >
                  <div className="flex justify-between w-full">
                    <div className="w-full mr-5">
                      <h3 className="font-semibold text-xl">
                        {user.invites.username}
                      </h3>
                      <p className="flex justify-between">
                        <span>Gender:</span>
                        <span className="w-3/5">
                          {" "}
                          {user.invites.gender == "L"
                            ? "Laki-laki"
                            : "Perempuan"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>Email:</span>
                        <span className="w-3/5">{user.invites.email}</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Semester:</span>
                        <span className="w-3/5">{user.invites.semester}</span>
                      </p>
                      <p className="mt-2">Field of interest: </p>
                    </div>

                    <div className="flex items-center cursor-default px-2 py-1 h-fit rounded-md font-semibold border-2 text-red-600 border-red-600">
                      Pending
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mt-1 gap-1.5 overflow-hidden">
                    {skillOptions.length > 0 && getFieldLabels(user.invites.field_of_preference).map(
                      (label, idx) => (
                        <span
                          key={idx}
                          className="flex w-full items-center cursor-default bg-blue-100 text-blue-700 px-2 py-2.5 rounded text-xs font-bold duration-300 hover:bg-blue-500 hover:duration-300 hover:text-white"
                        >
                          {label}
                        </span>
                      )
                    )}
                  </div>
                  <div className="flex mt-3 gap-2">
                    <GreenButton
                      label="Accept"
                      onClick={() =>
                        handleAcceptInvitation(user.invites.user_id)
                      }
                    />
                    <RedButton
                      label="Reject"
                      onClick={async () => {
                        const result = await Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Reject",
                        });

                        if (result.isConfirmed) {
                          await handleRejectInvitation(user.invites.user_id);

                          await Swal.fire({
                            title: "Invitation Rejected!",
                            text: "Invitation has been rejected.",
                            icon: "success",
                          });
                        }
                      }}
                    />
                  </div>
                </li>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RecommendationPage;
