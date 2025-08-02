import axios from "axios";
import { useState } from "react";
import { ROUTE_PATHS } from "../../router/routePaths";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../hooks/useToast";
import CommonConstant from "../../constant/CommonConstant";
import Select from "react-select";

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
];

function RegisterPage() {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [semester, setSemester] = useState("");
  const [fieldOfPreference, setFieldOfPreference] = useState<string[]>([]);

  const { successToast, warningToast, errorToast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    const lowerEmail = email.toLowerCase();
    const cleanFieldOfPreference = fieldOfPreference.join(',');
    console.log(cleanFieldOfPreference);
    e.preventDefault();
    try {
      if (await isFormValid()) {
        const response = await axios.post(CommonConstant.SubmitRegister, {
          fullname,
          username,
          email: lowerEmail,
          password,
          gender,
          semester,
          field_of_preference: cleanFieldOfPreference,
        });
        console.log(response.data);
        successToast(response.data.message);
        navigate(ROUTE_PATHS.LOGIN);
      }
    } catch (error) {
      console.log(error);
      errorToast("Register Failed");
    }
  };

  const isFormValid = async (): Promise<boolean> => {
    if (password.length < 4) {
      warningToast("Password must be at least 4 character");
      return false;
    }

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

    if (response.data.usernameExist) {
      warningToast("Username already exist, please choose another one");
      return false;
    } else if (response.data.emailExist) {
      warningToast("Email already exist, please choose another one");
      return false;
    }

    return true;
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col h-fit w-150 border p-5 rounded-2xl justify-center">
        <h2 className="text-4xl text-center">Register</h2>
        <form onSubmit={handleSubmit} method="POST">
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-lg">Full Name</label>
            <input
              type="text"
              id="fullname"
              placeholder="Your full name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            ></input>
            <label className="text-lg">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            ></input>
            <label className="text-lg">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="lowercase p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            ></input>
            <label className="text-lg">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password length must be more than 3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-1 w- border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            ></input>
            <label className="text-lg">Gender</label>
            <select
              name="gender"
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="p-1 border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            >
              <option value="" hidden>
                --Select one--
              </option>
              <option value="L">Laki-laki</option>
              <option value="P">Perempuan</option>
            </select>
            <label className="text-lg">Semester</label>
            <select
              name="semester"
              id="semester"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="p-1 w- border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
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
            <label className="text-lg">Field of preference</label>
            <Select
              isMulti
              name="field_of_preference"
              options={FIELD_OF_PREFERENCE}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              // value={fieldOfPreference}
              onChange={(selectedOptions) =>
                setFieldOfPreference(
                  (selectedOptions as OptionType[]).map((opt) => opt.value)
                )
              }
              closeMenuOnSelect={false}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white mt-12 p-2 rounded-md duration-300 hover:bg-blue-600 hover:duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
