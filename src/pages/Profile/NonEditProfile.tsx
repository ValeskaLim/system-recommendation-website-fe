import Select from "react-select";
import BlueButton from "../../components/BlueButton";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToast } from "../../hooks/useToast";
import CommonConstant from "../../constant/CommonConstant";

const NonEditProfile = ({ users, setIsEdit }) => {
  const [skillOptions, setSkillOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const { errorToast } = useToast();
  const selectedValues = users?.field_of_preference?.split(",") || [];

  useEffect(() => {
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
    fetchSkillsets();
  }, []);
  return (
    <div className="mx-50 bg-white rounded-2xl shadow-xl p-5">
      <h1 className="font-bold text-4xl">
        {users?.fullname}'s <span className="font-normal">Profile</span>
      </h1>
      <div className="w-full">
        <form className="mt-10">
          <div className="flex flex-col justify-between">
            <h3 className="required flex items-center text-lg w-fit">
              Username
            </h3>
            <input
              type="text"
              disabled
              value={users?.username}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="flex items-center text-lg w-fit">Password</h3>
            <div className="w-full mt-3">
              <BlueButton
                label="Change"
                disabled
                extendedClassName="disabled:opacity-50 disabled:hover:cursor-not-allowed disabled:hover:bg-blue-500"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="required flex items-center text-lg w-fit">Email</h3>
            <input
              type="email"
              disabled
              value={users?.email}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="flex items-center text-lg w-fit">Gender</h3>
            <input
              type="text"
              disabled
              value={users?.gender === "L" ? "Laki-Laki" : "Perempuan"}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="flex items-center text-lg w-fit">Semester</h3>
            <input
              type="number"
              disabled
              value={users?.semester}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="required flex items-center text-lg w-fit">Major</h3>
            <input
              type="text"
              disabled
              value={users?.major}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="required flex items-center text-lg w-fit">
              Field of preference
            </h3>
            <Select
              isMulti
              name="field_of_preference"
              options={skillOptions}
              value={skillOptions.filter((option) =>
                selectedValues.includes(option.value)
              )}
              className="basic-multi-select w-full mt-3"
              classNamePrefix="select"
              closeMenuOnSelect={false}
              required
              isDisabled
            />
          </div>
          <div className="flex flex-col justify-between mt-4">
            <h3 className="flex items-center text-lg w-fit">Portfolio link</h3>
            <input
              type="text"
              disabled
              value={users?.portfolio}
              className="text-md mt-3 bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <BlueButton
            label="Edit Profile"
            onClick={() => setIsEdit(true)}
            extendedClassName="mt-5"
          />
        </form>
      </div>
    </div>
  );
};

export default NonEditProfile;
