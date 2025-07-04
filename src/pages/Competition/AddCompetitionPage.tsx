import { useState } from "react";
import { ROUTE_PATHS } from "../../router/routePaths";
import { IoBackspaceOutline } from "react-icons/io5";

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
    const [slot, setSlot] = useState<number | undefined>();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        if(slot < 0 || slot == undefined) {

        }
        //   await login(email.toLowerCase(), password);
        //   navigate(ROUTE_PATHS.HOME);
        //   successToast("Success logged in!");
        // } catch (error) {
        //   console.log(error);
        //   errorToast("Invalid email or password");
        // }
    };

    return (
        <div className="flex flex-col">
            <a href={ROUTE_PATHS.COMPETITION} className="flex items-center w-fit bg-white text-black border border-3 p-2 rounded-lg duration-300 hover:border hover:border-3 hover:border-blue-500 hover:duration-300">
                <IoBackspaceOutline className="text-xl mr-2" />Back</a>
            <div className="mt-5">
                <h1 className="text-3xl mb-5">Add Competition Data</h1>
                <form method="POST" onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between">
                        <label className="text-lg mr-20 items-center flex">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Input competition title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label className="text-lg mr-19 items-center flex">Date</label>
                        <input
                            type="date"
                            id="date"
                            placeholder="Input competition title"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                        />
                    </div>
                    <div className="flex justify-between">
                        <label className="text-lg mr-16 items-center flex">Status</label>
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
                            <option value="L">Active</option>
                            <option value="P">Inactive</option>
                        </select>
                    </div>
                    <div className="flex justify-between">
                        <label className="text-lg mr-16 items-center flex">Type</label>
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
                        <label className="text-lg mr-16 items-center flex">Slot</label>
                        <input
                            type="number"
                            id="slot"
                            placeholder="Input initial slot"
                            value={slot}
                            className="p-1 w-full border border-gray-500 rounded text-gray-900 placeholder:text-gray-400 focus:outline"
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCompetitionPage;