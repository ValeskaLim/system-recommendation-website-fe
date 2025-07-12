import axios from "axios";
import Select from "react-select";
import CommonConstant from "../../constant/CommonConstant";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";

type OptionType = {
  label: string;
  value: string;
};

const FIELD_OF_PREFERENCE = [
  { label: "Data Science", value: "DS" },
  { label: "Web Development", value: "WD" },
  { label: "Mobile Development", value: "MD" },
  { label: "Game Development", value: "GD" },
  { label: "Cyber Security", value: "CS" },
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Machine Learning", value: "ML" },
  { label: "Blockchain", value: "BC" },
  { label: "Cloud Computing", value: "CC" },
  { label: "Internet of Things", value: "IoT" },
  { label: "DevOps", value: "DO" },
  { label: "Augmented Reality", value: "AR" },
  { label: "Virtual Reality", value: "VR" },
  { label: "Quantum Computing", value: "QC" },
  { label: "Robotics", value: "RO" },
  { label: "Natural Language Processing", value: "NLP" },
  { label: "Computer Vision", value: "CV" },
];

const EditProfile = ({ users, setIsEdit }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [semester, setSemester] = useState("");
  const [major, setMajor] = useState("");
  const [fieldOfPreference, setFieldOfPreference] = useState<string[]>([]);

  const selectedFields = FIELD_OF_PREFERENCE.filter((option) =>
    users?.field_of_preference?.includes(option.value)
  );

  const { successToast, warningToast, errorToast } = useToast();

  const handleSubmit = async (e) => {
    const lowerEmail = email.toLowerCase();
    const cleanFieldOfPreference = fieldOfPreference.join(",");
    console.log(isFormValid);
    console.log(username);
    e.preventDefault();
    try {
      if (await isFormValid()) {
        const response = await axios.post(CommonConstant.EditUser, {
          user_id: users?.user_id,
          username,
          email: lowerEmail,
          gender,
          semester,
          major,
          field_of_preference: cleanFieldOfPreference,
        });
        console.log(response.data);
        successToast(response.data.message);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      errorToast("Edit data failed");
    }
  };

  const isFormValid = async (): Promise<boolean> => {
    if (username.trim() === "") {
      warningToast("Username cannot be empty or spaces only");
      return false;
    }

    if (/\s/.test(username)) {
      warningToast("Username cannot contain spaces");
      return false;
    }

    const response = await axios.post(CommonConstant.GetExistingUser, {
      username,
      email,
    });

    if (response.data.usernameExist && username !== users?.username) {
      warningToast("Username already exist, please choose another one");
      return false;
    } else if (response.data.emailExist && email !== users?.email) {
      warningToast("Email already exist, please choose another one");
      return false;
    }

    return true;
  };

  useEffect(() => {
    if (users) {
      setUsername(users.username || "");
      setEmail(users.email || "");
      setGender(users.gender || "");
      setSemester(users.semester || "");
      setMajor(users.major || "");
      setFieldOfPreference(
        users.field_of_preference ? users.field_of_preference.split(",") : []
      );
    }
  }, [users]);

  return (
    <div>
      <h1 className="font-bold text-5xl">
        {users?.fullname}'s <span className="font-normal">Profile</span>
      </h1>
      <div className="w-1/2">
        <form className="mt-10" onSubmit={handleSubmit} method="POST">
          <div className="flex justify-between">
            <h3 className="flex items-center text-lg">Username</h3>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-md p-2 border border-[#e6e6e6] rounded-lg w-200"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg">Email</h3>
            <input
              type="email"
              value={users?.email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-md p-2 border border-[#e6e6e6] rounded-lg w-200"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg">Gender</h3>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="text-md p-2 border border-[#e6e6e6] rounded-lg w-200"
            >
              <option value="" hidden>
                --Select one--
              </option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg">Semester</h3>
            <select
              name="semester"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="text-md p-2 border border-[#e6e6e6] rounded-lg w-200"
            >
              <option value="" hidden>
                --Select one--
              </option>
              {Array.from({ length: 8 }, (_, i) => (
                <option value={i + 1} key={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg">Major</h3>
            <input
              name="major"
              id="major"
              type="text"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="text-md p-2 border border-[#e6e6e6] rounded-lg w-200"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg">Field of preference</h3>
            <Select
              isMulti
              name="field_of_preference"
              options={FIELD_OF_PREFERENCE}
              defaultValue={selectedFields}
              className="basic-multi-select w-200"
              classNamePrefix="select"
              closeMenuOnSelect={false}
              onChange={(selectedOptions) =>
                setFieldOfPreference(
                  (selectedOptions as OptionType[]).map((opt) => opt.value)
                )
              }
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="mt-5 cursor-pointer block w-fit bg-blue-600 text-white p-3 rounded-lg duration-300 font-bold hover:bg-blue-700 hover:duration-300"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEdit(false)}
              className="mt-5 cursor-pointer block w-fit p-3 text-blue-600 rounded-lg border-2 border-blue-600 duration-300 font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
