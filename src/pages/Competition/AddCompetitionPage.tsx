import { ROUTE_PATHS } from "../../router/routePaths";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommonConstant from "../../constant/CommonConstant";
import { useState } from "react";
import GreenButton from "../../components/GreenButton";
import RedButton from "../../components/RedButton";

const COMPETITION_TYPES = [
  { label: "Artificial Intelligence", value: "AI" },
  { label: "Software Development", value: "SD" },
  { label: "Mobile Development", value: "MD" },
];

const AddCompetitionPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [slot, setSlot] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");

  const { errorToast, successToast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (slot === undefined || slot < 0) {
        errorToast("Slot must be a non-negative number");
        return;
      }

      await axios.post(
        CommonConstant.GetExistingCompetition,
        {
          title,
          date,
        }
      );

      await axios.post(CommonConstant.AddCompetition, {
        title,
        date,
        status,
        type,
        slot,
        description,
      });
      navigate(ROUTE_PATHS.COMPETITION);
      successToast("Competition successfully added");
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "An unexpected error occurred";

      errorToast(errorMessage);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="">
        <div className="flex w-fit mb-5">
          <h1 className="text-3xl">Add Competition Data</h1>
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
            <GreenButton label="Submit" />
            <RedButton label="Cancel" onClick={() => navigate(-1)} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCompetitionPage;
