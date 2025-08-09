import axios from "axios";
import { useEffect, useState } from "react";
import CommonConstant from "../../constant/CommonConstant";
import { useToast } from "../../hooks/useToast";
import { IoSettingsSharp } from "react-icons/io5";
import { useAuth } from "../../hooks/AuthProvider";

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
  const [invitedUser, setInvitedUser] = useState([]);
  const [isIgnoreSemester, setisIgnoreSemester] = useState(false);
  const [isIgnoreGender, setisIgnoreGender] = useState(false);
  const [isRunRecommend, setIsRunRecommend] = useState(false);
  const { successToast, errorToast } = useToast();

  const { users } = useAuth();

  useEffect(() => {
    const fetchInvitedUser = async () => {
      const response = await axios.post(CommonConstant.GetInvitedUser);
      try {
        if (response.data.success) {
          const invitedUser = response.data.data || [];
          setInvitedUser(invitedUser);
        }
      } catch (error: any) {
        console.log(error);
        errorToast(error);
      }
    };

    fetchInvitedUser();
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
    if(invitedUser.length === 2) {
        return true;
    }
    
    return false;
  }

  const processRecommend = async (e) => {
    e.preventDefault();
    if(users !== null) {
        try {
            const response = await axios.post(CommonConstant.Recommendation, {user_id: users.user_id, ignore_gender: isIgnoreGender, ignore_semester: isIgnoreSemester});
            console.log(response.data);
            setIsRunRecommend(true);
        } catch (error: any) {
            console.log(error);
            errorToast(error);
        }
    } else {
        errorToast("Current user is not found");
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
          </div>
        </form>
        {isRunRecommend ? (
          <>
            <div>
                deez
            </div>
          </>
        ) : (
          <>
            <h3 className="mt-5 text-2xl font-semibold">Your invites:</h3>
            <p className="text-md font-semibold text-red-500 italic">
              **Currently you have{" "}
              <span
                className={
                  isMaxInvite() ? "text-red-500" : "text-green-500"
                }
              >
                {isMaxInvite() ? "0" : 2 - invitedUser.length}
              </span>{" "}
              invitations left**
            </p>
            <div className="mt-3 space-y-2 grid grid-cols-4 gap-2">
              {invitedUser.map((user: any, idx) => (
                <li
                  key={idx}
                  className="flex border p-3 rounded-xl shadow-sm h-full"
                >
                  <div className="flex justify-between w-full">
                    <div>
                      <h3 className="font-semibold text-xl">
                        {user.invitee.username}
                      </h3>
                      <p>
                        Gender:{" "}
                        {user.invitee.gender == "L" ? "Laki-laki" : "Perempuan"}
                      </p>
                      <p>Email: {user.invitee.email}</p>
                      <p>Semester: {user.invitee.semester}</p>
                      <p className="mt-5">Field of interest: </p>
                      <div className="grid grid-cols-3 mt-1 w-fit gap-1.5 overflow-hidden">
                        {getFieldLabels(user.invitee.field_of_preference).map(
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
                    <div className="flex items-center cursor-default px-2 py-1 h-fit rounded-md font-semibold border-2 text-red-600 border-red-600">
                      Pending
                    </div>
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
