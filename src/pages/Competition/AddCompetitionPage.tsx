import { ROUTE_PATHS } from "../../router/routePaths";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommonConstant from "../../constant/CommonConstant";
import { useState } from "react";
import GreenButton from "../../components/GreenButton";
import RedButton from "../../components/RedButton";

const COMPETITION_CATEGORIES = [
  { label: "Security", value: "SEC" },
  { label: "Machine Learning", value: "ML" },
  { label: "Mobile Development", value: "MD" },
];

const AddCompetitionPage = () => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [minMember, setMinMember] = useState<number | undefined>(undefined);
  const [maxMember, setMaxMember] = useState<number | undefined>(undefined);
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState<File | null>(null);
  const [originalUrl, setOriginalUrl] = useState("");

  const { errorToast, successToast } = useToast();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (minMember === undefined || minMember < 0) {
        errorToast("Minimum number must be a non-negative number");
        return;
      }

      if (maxMember === undefined || maxMember < 0) {
        errorToast("Maximum number must be a non-negative number");
        return;
      }

      await axios.post(CommonConstant.GetExistingCompetition, {
        title,
        date,
      });

      const formData = new FormData();

      formData.append("title", title);
      formData.append("date", date);
      formData.append("status", status);
      formData.append("category", category);
      formData.append("min_member", minMember.toString());
      formData.append("max_member", maxMember.toString());
      formData.append("description", description);
      formData.append("poster", poster ?? "");
      formData.append("original_url", originalUrl);

      await axios.post(CommonConstant.AddCompetition, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
            <label className="text-lg items-center flex w-64">Category</label>
            <select
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              required
            >
              <option value="" hidden>
                --Select one--
              </option>
              {COMPETITION_CATEGORIES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between">
              <label className="text-lg items-center flex w-64">Original Url</label>
              <input
                type="text"
                id="originalUrl"
                placeholder="Input original URL"
                value={originalUrl}
                onChange={(e) => setOriginalUrl(e.target.value)}
                className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
              />
            </div>
          <div className="flex justify-between">
            <label className="text-lg items-center flex w-64">Min member</label>
            <input
              type="number"
              id="min-member"
              min="0"
              placeholder="Input minimum member"
              value={minMember ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setMinMember(isNaN(value) ? undefined : value);
              }}
              required
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            />
          </div>
          <div className="flex justify-between">
            <label className="text-lg items-center flex w-64">Max member</label>
            <input
              type="number"
              id="max-member"
              min="0"
              placeholder="Input maximum member"
              value={maxMember ?? ""}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                setMaxMember(isNaN(value) ? undefined : value);
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
          <div className="flex justify-between">
            <label className="text-lg items-center flex w-64">Poster</label>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              min="0"
              placeholder="Input maximum member"
              onChange={(e) =>
                setPoster(e.target.files ? e.target.files[0] : null)
              }
              required
              className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
            />
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
