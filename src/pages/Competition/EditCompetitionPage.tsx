import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import axios from "axios";
import CommonConstant from "../../constant/CommonConstant";
import { useNavigate, useParams } from "react-router-dom";
import { ROUTE_PATHS } from "../../router/routePaths";
import GreenButton from "../../components/GreenButton";
import RedButton from "../../components/RedButton";

const COMPETITION_TYPES = [
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Software Development", value: "SD" },
  { label: "Mobile Development", value: "MD" },
];

type Competition = {
  title: string;
  date: string;
  status: string;
  type: string;
  slot: number;
  description: string;
};

const EditCompetitionPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [slot, setSlot] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [competititonData, setCompetititonData] = useState<
    Competition | undefined
  >(undefined);

  const { errorToast, successToast } = useToast();
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    const fetchCompetition = async () => {
      try {
        const response = await axios.post(CommonConstant.GetCompetitionById, {
          id: Number(id),
        });

        if (response.data.success) {
          const competititonData = response.data.data || undefined;
          setCompetititonData(competititonData);
        } else {
          errorToast("Failed to fetch competition");
          setCompetititonData(undefined);
        }
      } catch (error) {
        console.log(error);
        errorToast("Error fetching competition");
      }
    };
    if (id) fetchCompetition();
  }, [id]);

  useEffect(() => {
    if (!competititonData) return;
    setTitle(competititonData.title);
    setDate(competititonData.date);
    setStatus(competititonData.status);
    setType(competititonData.type);
    setSlot(competititonData.slot);
    setDescription(competititonData.description);
  }, [competititonData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const request = await axios.post(CommonConstant.EditCompetition, {
        competition_id: Number(id),
        title,
        date,
        status,
        type,
        slot,
        description,
      });
      console.log(request.data.success);
      if (request.data.success) {
        navigate(ROUTE_PATHS.COMPETITION);
        successToast(request.data.message);
      }
    } catch (error: any) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        errorToast(error.response.data.message);
      } else {
        errorToast("Error edit competition");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <div className="flex w-fit mb-5">
            {/* <button onClick={() => navigate(-1)}><MdOutlineArrowBackIosNew className="cursor-pointer flex items-center text-2xl mr-2 font-semibold" /></button> */}
            <h1 className="text-3xl">Edit Competition Data</h1>
          </div>
          <form method="POST" onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Input competition title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                required
              />
            </div>
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Date</label>
              <input
                type="date"
                id="date"
                placeholder="Input competition title"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                required
              />
            </div>
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Status</label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                required
              >
                <option value="" hidden>
                  --Select one--
                </option>
                <option value="ACT">Active</option>
                <option value="INA">Inactive</option>
              </select>
            </div>
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Type</label>
              <select
                name="type"
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                required
              >
                <option value="" hidden>
                  --Select one--
                </option>
                {COMPETITION_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Slot</label>
              <input
                type="number"
                id="slot"
                min="0"
                placeholder="Input initial slot"
                value={slot ?? ""}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  setSlot(isNaN(value) ? undefined : value);
                }}
                required
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              />
            </div>
            <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                required
              ></textarea>
            </div>
            <div className="flex gap-2">
              <GreenButton type="submit" label="Save" />
              <RedButton label="Cancel" onClick={() => navigate(-1)} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCompetitionPage;
