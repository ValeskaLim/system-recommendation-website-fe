import { ROUTE_PATHS } from "../../router/routePaths";
import { IoBackspaceOutline } from "react-icons/io5";
import { useToast } from "../../hooks/useToast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CommonConstant from "../../constant/CommonConstant";
import { useState } from "react";

const COMPETITION_TYPES = [
    { label: 'Artificial Intelligence', value: 'AI' },
    { label: 'Software Development', value: 'SD' },
    { label: 'Mobile Development', value: 'MD' },
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

            const existing_data = await axios.post(CommonConstant.GetExistingCompetition, {
                title, date
            });

            if(existing_data.data.isExist === true) {
                errorToast(`Competition ${title} is already exist!`);
                return;
            }

            await axios.post(CommonConstant.AddCompetition, {
                title, date, status, type, slot, description
            });
            navigate(ROUTE_PATHS.COMPETITION);
            successToast("Competition successfully added");
        } catch (error) {
            console.log(error);
            errorToast("Error adding competition");
        }
    };

    return (
        <div className="flex flex-col">
            <a href={ROUTE_PATHS.COMPETITION} className="flex items-center w-fit bg-white text-black border border-3 p-2 rounded-lg duration-300 hover:border hover:border-3 hover:border-blue-500 hover:duration-300">
                <IoBackspaceOutline className="text-xl mr-2" />Back</a>
            <div className="mt-5">
                <h1 className="text-3xl mb-5">Add Competition Data</h1>
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
                                <option key={t.value} value={t.value}>{t.label}</option>
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
                        <label className="text-lg items-center flex w-64">Description</label>
                        <textarea 
                            name="description" 
                            id="description" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline" 
                            required>
                        </textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-fit bg-blue-500 text-white mt-5 py-2 px-4 rounded-md duration-300 hover:bg-blue-600 hover:duration-300"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCompetitionPage;