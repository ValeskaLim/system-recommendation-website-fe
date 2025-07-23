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

const TeammatesMainPage = () => {
  const [teammates, setTeammates] = useState([]);
  const [error, setError] = useState(null);

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
    const fetchTeammates = async () => {
      try {
        const response = await axios.post(CommonConstant.TeammatesList, {});

        if (response.data.success) {
          const fetchedTeammates = response.data.teammates || [];

          setTeammates(fetchedTeammates);
        } else {
          errorToast("Failed to fetch teammates");
          setError(response.data.message || "Failed to fetch teammates");
        }
      } catch (error) {
        console.log(error);
        errorToast("Error fetching teammates");
      }
    };

    if (users) {
      fetchTeammates();
    }
  }, []);

  const deleteUser = async (user_id) => {
    try {
      const response = await axios.post(CommonConstant.RemoveUser, { user_id });

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

  return (
    <div className="flex flex-col">
      <h1 className="text-4xl mb-4">Teammates List</h1>

      {error && <p className="text-red-500">{error}</p>}
      {teammates.length === 0 && !error && <p>No teammates found.</p>}

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
            {user.user_id !== users?.user_id && (
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
    </div>
  );
};

export default TeammatesMainPage;
