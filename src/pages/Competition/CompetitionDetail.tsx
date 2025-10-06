import { useLocation } from "react-router-dom";
import CommonConstant from "../../constant/CommonConstant";
import { useEffect, useState } from "react";
import { useToast } from "../../hooks/useToast";
import axios from "axios";
import BlueButton from "../../components/BlueButton";

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
  const [countdown, setCountdown] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isAlreadyRequested, setIsAlreadyRequested] = useState([]);
  const [isFinalized, setIsFinalized] = useState("");
  const [isMaxMember, setIsMaxMember] = useState("");

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

    const fetchCheckAlreadyJoined = async () => {
      try {
        const response = await axios.post(
          CommonConstant.CheckAnyCompetitionsJoined
        );
        setIsJoined(response.data.data.hasJoined);
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message || "Failed to check participation";
        errorToast(errorMessage);
      }
    };

    const fetchListTeamUserRequest = async () => {
      try {
        const response = await axios.post(
          CommonConstant.GetListTeamUserRequest
        );
        if (response.data.success) {
          const requestedTeamIds = response.data.data.map(
            (request: any) => request.team_id
          );
          setIsAlreadyRequested(requestedTeamIds);
        }
      } catch (error: any) {
        console.log(error);
        const errorMessage =
          error.response?.data?.message || "Failed to fetch team user requests";
        errorToast(errorMessage);
      }
    };

    fetchListTeamUserRequest();
    fetchCheckAlreadyJoined();
    fetchParticipants();
  }, [competition]);

  useEffect(() => {
    if (!competition?.date) return;
    const target = new Date(competition.date).getTime();

    const interval = setInterval(() => {
      const now = Date.now();
      const diff = target - now;

      if (diff <= 0) {
        setCountdown("00 : 00 : 00 : 00");
        clearInterval(interval);
        return;
      }

      const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(
        2,
        "0"
      );
      const hours = String(Math.floor(diff / (1000 * 60 * 60)) % 24).padStart(
        2,
        "0"
      );
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(
        2,
        "0"
      );
      const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");

      setCountdown(`${days} : ${hours} : ${minutes} : ${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [competition.date]);

  const handleRequestJoin = async (teamId: number) => {
    try {
      const response = await axios.post(CommonConstant.RequestJoinTeam, {
        team_id: teamId,
      });
      if (response.data.success) {
        successToast(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        errorToast(response.data.message);
      }
    } catch (error: any) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message || "Failed to request join team";
      errorToast(errorMessage);
    }
  };

  return (
    <div className="main-container">
      <div className="main-col-container">
        <h1 className="text-4xl mb-4 font-semibold">{competition.title}</h1>
        <div className="w-full h-fit">
          <img
            src={`${CommonConstant.ImageSource}${competition.poster}`}
            alt={competition.title}
            className="w-full max-h-[500px] object-none cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={`${CommonConstant.ImageSource}${competition.poster}`}
                alt={competition.title}
                className="object-contain"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}
        </div>
        <div className="border-2 border-dashed mt-15 p-3 rounded-2xl border-green-500 bg-green-100 text-lg">
          <div className="flex flex-col gap-2">
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-3xl text-green-700 mb-2">
                Starts In
              </h2>
              <h3 className="font-semibold text-2xl text-green-700 mb-4">
                {countdown}
              </h3>
              <hr className="border w-full text-green-500 border-dashed" />
            </div>
            <div className="flex w-full">
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
                  Status: {competition.status === "ACT" ? "Active" : "Inactive"}
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
                  <h3 className="font-semibold text-2xl">
                    {participant.team_name}
                  </h3>
                  <div className="ml-3 my-3">
                    {participant.members.map((member, index) => (
                      <ul key={index} className="text-lg">
                        <li>{"> " + member}</li>
                      </ul>
                    ))}
                  </div>
                  <p className="font-bold mt-10 text-lg">Notes for candidate</p>
                  <div className="mt-3 bg-slate-200 p-3 rounded-xl">
                    <p className="whitespace-pre-wrap font-semibold">
                      {participant.notes || "-"}
                    </p>
                  </div>
                  {!isJoined && !participant.is_finalized && !participant.is_full && (
                    <BlueButton
                      label="Request join"
                      onClick={() => handleRequestJoin(participant.team_id)}
                      extendedClassName="disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 mt-5"
                      disabled={isAlreadyRequested.includes(
                        participant.team_id
                      )}
                    />
                  )}
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
