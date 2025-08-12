import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../../hooks/AuthProvider";
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

const RecommendationPage = () => {
  const [inviteesUser, setinviteesUser] = useState([]);
  const [invitesUser, setinvitesUser] = useState([]);
  const [isIgnoreSemester, setisIgnoreSemester] = useState(false);
  const [isIgnoreGender, setisIgnoreGender] = useState(false);
  const [isRunRecommend, setIsRunRecommend] = useState(false);
  const [recommendUsers, setRecommendUsers] = useState([]);
  const { successToast, errorToast } = useToast();

  const { users } = useAuth();

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

    const fetchinvitesUser = async () => {
      const response = await axios.post(CommonConstant.GetInvitesUser);
      try {
        if (response.data.success) {
          const invitesUser = response.data.data || [];
          setinvitesUser(invitesUser);
        }
      } catch (error: any) {
        console.log(error);
        errorToast(error)
      }
    }

    fetchinviteesUser();
    fetchinvitesUser();
  }, []);

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

  const isMaxInvite = () => {
    if (inviteesUser.length === 2) {
      return true;
    }

    return false;
  }

  const processRecommend = async (e) => {
    e.preventDefault();
    if (users !== null) {
      try {
        const response = await axios.post(CommonConstant.Recommendation, { user_id: users.user_id, ignore_gender: isIgnoreGender, ignore_semester: isIgnoreSemester });
        console.log(response.data);
        setRecommendUsers(response.data.results);
        setIsRunRecommend(true);
      } catch (error: any) {
        console.log(error);
        errorToast(error);
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
      const response = await axios.post(CommonConstant.RemoveUserInvitation, { user_id: user_id });
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
  }

  const handleAcceptInvitation = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.AcceptInvites, { user_id: user_id });
      if (response.data.success) {
        successToast(response.data.messages);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleRejectInvitation = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.RejectInvites, {user_id: user_id});
      if(response.data.success) {
        console.log(response.data.messages);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  }

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
                disabled={isMaxInvite()}
              />
              <p>Ignore gender</p>
            </div>
            <div className="gap-2 flex">
              <input
                type="checkbox"
                checked={isIgnoreSemester}
                onChange={(e) => setisIgnoreSemester(e.target.checked)}
                disabled={isMaxInvite()}
              />
              <p>Ignore semester</p>
            </div>
            <button
              type="submit"
              className="cursor-pointer flex gap-2 group text-lg items-center w-fit text-white bg-blue-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-blue-600 hover:duration-300 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={isMaxInvite()}
            >
              Recommend
              <IoSettingsSharp className="text-2xl duration-300 group-hover:rotate-90 group-hover:duration-300 group-disabled:rotate-0" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="cursor-pointer flex gap-2 group text-lg items-center w-fit text-white bg-red-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-red-600 hover:duration-300 disabled:cursor-not-allowed disabled:bg-red-300"
              disabled={isRunRecommend == false}
            >
              Reset
            </button>
          </div>
        </form>
        {isRunRecommend ? (
          <>
            <div>
              <h3 className="mt-5 text-2xl font-semibold">Top 3 users that matches with you</h3>
              <div className="grid grid-cols-3">
                { }
              </div>
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-5 text-2xl font-semibold">Your invitees:</h3>
            <p className="text-md font-semibold text-red-500 italic">
              **Currently you have{" "}
              <span
                className={
                  isMaxInvite() ? "text-red-500" : "text-green-500"
                }
              >
                {isMaxInvite() ? "0" : 2 - inviteesUser.length}
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
                        <span>
                          Gender:
                        </span>
                        <span className="w-3/5">
                          {" "}
                          {user.invitee.gender == "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>
                          Email:
                        </span>
                        <span className="w-3/5">
                          {user.invitee.email}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>
                          Semester:
                        </span>
                        <span className="w-3/5">
                          {user.invitee.semester}
                        </span></p>
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
                  <button onClick={async () => {
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
                  }} className="mt-2 cursor-pointer flex gap-2 group text-sm items-center w-fit text-white bg-red-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-red-600 hover:duration-300">Remove</button>
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
                        <span>
                          Gender:
                        </span>
                        <span className="w-3/5">
                          {" "}
                          {user.invites.gender == "L" ? "Laki-laki" : "Perempuan"}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>
                          Email:
                        </span>
                        <span className="w-3/5">
                          {user.invites.email}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span>
                          Semester:
                        </span>
                        <span className="w-3/5">
                          {user.invites.semester}
                        </span></p>
                      <p className="mt-2">Field of interest: </p>
                    </div>

                    <div className="flex items-center cursor-default px-2 py-1 h-fit rounded-md font-semibold border-2 text-red-600 border-red-600">
                      Pending
                    </div>
                  </div>
                  <div className="grid grid-cols-3 mt-1 gap-1.5 overflow-hidden">
                    {getFieldLabels(user.invites.field_of_preference).map(
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
                  <div className="flex">
                    <button onClick={() => handleAcceptInvitation(user.invites.user_id)} className="mt-2 cursor-pointer flex gap-2 group text-sm items-center w-fit text-white bg-green-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-green-600 hover:duration-300">Accept</button>
                    <button onClick={async () => {
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
                        await handleRejectInvitation(user.invites.user_id);

                        await Swal.fire({
                          title: "Invitation Deleted!",
                          text: "Invitation has been removed.",
                          icon: "success",
                        });
                      }
                    }} className="mt-2 cursor-pointer flex gap-2 group text-sm items-center w-fit text-white bg-red-500 border-2 py-2 px-4 rounded-md duration-300 font-semibold 
                        hover:bg-red-600 hover:duration-300">Reject</button>
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
