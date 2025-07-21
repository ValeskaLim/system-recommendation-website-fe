import Select from "react-select";

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

const NonEditProfile = ({ users, setIsEdit }) => {
  const selectedFields = FIELD_OF_PREFERENCE.filter((option) =>
    users?.field_of_preference?.includes(option.value)
  );

  console.log(selectedFields);

  return (
    <div>
      <h1 className="font-bold text-4xl">
        {users?.fullname}'s <span className="font-normal">Profile</span>
      </h1>
      <div className="w-full">
        <form className="mt-10">
          <div className="flex justify-between">
            <h3 className="flex items-center text-lg w-60">Username</h3>
            <input
              type="text"
              disabled
              value={users?.username}
              className="text-md bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg w-60">Email</h3>
            <input
              type="email"
              disabled
              value={users?.email}
              className="text-md bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg w-60">Gender</h3>
            <input
              type="text"
              disabled
              value={users?.gender === "L" ? "Laki-Laki" : "Perempuan"}
              className="text-md bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg w-60">Semester</h3>
            <input
              type="number"
              disabled
              value={users?.semester}
              className="text-md bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg w-60">Major</h3>
            <input
              type="text"
              disabled
              value={users?.major}
              className="text-md bg-[#f2f2f2] p-2 border border-[#e6e6e6] rounded-lg w-full"
            />
          </div>
          <div className="flex justify-between mt-4">
            <h3 className="flex items-center text-lg w-60">Field of preference</h3>
            <Select
              isMulti
              name="field_of_preference"
              options={FIELD_OF_PREFERENCE}
              defaultValue={selectedFields}
              className="basic-multi-select w-full"
              classNamePrefix="select"
              closeMenuOnSelect={false}
              required
              isDisabled
            />
          </div>
          <div
            onClick={() => setIsEdit(true)}
            className="mt-5 cursor-pointer block w-fit bg-blue-600 text-white p-3 rounded-lg duration-300 font-bold hover:bg-blue-700 hover:duration-300"
          >
            Edit Profile
          </div>
        </form>
      </div>
    </div>
  );
};

export default NonEditProfile;
