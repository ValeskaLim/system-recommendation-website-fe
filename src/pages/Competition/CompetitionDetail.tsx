import { useLocation } from "react-router-dom";
import CommonConstant from "../../constant/CommonConstant";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import axios from "axios";

const COMPETITION_CATEGORIES = [
  { label: "Security", value: "SEC" },
  { label: "Machine Learning", value: "ML" },
  { label: "Mobile Development", value: "MD" },
];

const CompetitionDetail = () => {
  const location = useLocation();
  const competition = location.state?.competition;

  const { successToast, errorToast } = useToast();
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    if (!competition) return;

    const fetchParticipants = async () => {
      try {
        const response = await axios.post(
          CommonConstant.GetParticipantsByCompetitionId,
          {
            competition_id: competition.competition_id,
          }
        );
        setParticipants(response.data.data);
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message || "Failed to fetch participants";
        errorToast(errorMessage);
      }
    };
    fetchParticipants();
  }, [competition]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col max-w-7xl mx-auto w-full">
        <h1 className="text-4xl mb-4 font-semibold">{competition.title}</h1>
        <div className="w-full h-full">
          <img
            src={`${CommonConstant.ImageSource}${competition.poster}`}
            alt={competition.title}
            className="w-full max-h-[500px] object-cover"
          />
        </div>
        <div className="border-2 border-dashed mt-15 p-3 rounded-2xl border-green-500 bg-green-100 text-lg">
          <div className="flex gap-2">
            <div className="flex flex-col gap-2 w-full">
              <p className="font-semibold text-green-700 ">
                Category:{" "}
                {
                  COMPETITION_CATEGORIES.find(
                    (c) => c.value === competition.category
                  )?.label
                }
              </p>
              <p className="font-semibold text-green-700">
                Status: {competition.status}
              </p>
              <p className="font-semibold text-green-700">
                Date Started:{" "}
                {new Date(competition.date).toLocaleString("id-ID", {
                  dateStyle: "long",
                })}
              </p>
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
              <p className="font-semibold text-green-700">
                Min member: {competition.min_member}
              </p>
              <p className="font-semibold text-green-700">
                Max member: {competition.max_member}
              </p>
              <p className="font-semibold text-green-700">
                Original Url:{" "}
                <a
                  href={competition.original_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {competition.original_url
                    ? competition.original_url.substring(0, 50) + "..."
                    : "-"}
                </a>
              </p>
            </div>
          </div>
        </div>
        <p className="whitespace-pre-wrap text-lg mt-10">
          {competition.description}
        </p>
        <div className="mt-15">
          <h2 className="text-4xl font-bold">Participant</h2>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {participants.length === 0 ? (
              <p className="text-lg">No participants yet.</p>
            ) : (
              participants.map((participant) => (
                <div key={participant.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold text-2xl">{participant.team_name}</h3>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompetitionDetail;
