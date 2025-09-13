import React, { useState } from "react";
import axios from "axios";
import { Check, Copy } from "lucide-react";

export default function TeamSection({ handleClick, eventId, userId }: { handleClick: any, eventId: number; userId: number }) {
    const [teamName, setTeamName] = useState("");
    const [joinCode, setJoinCode] = useState("");
    const [user, setuser] = useState("");
    const [message, setMessage] = useState({
        message: "",
        team_id: null,
        join_code: ""
    });
    const [teamBox, setTeamBox] = useState("create")


    const handleCreateTeam = async (e: any) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", teamName);
        formData.append("event_id", eventId.toString());
        formData.append("leader_id", userId.toString());

        try {
            const res = await axios.post("http://localhost:8000/create", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            if (handleClick) {
                handleClick()
                setMessage(res.data);
            }
        } catch (error) {
            console.error("Error : ", error);
            console.log(userId)
        }
    };

    const handleJoinTeam = async (e: any) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("team_code", joinCode);
        formData.append("event_id", eventId.toString());
        formData.append("leader_id", userId.toString());

        const payload = {
            team_code: joinCode,
            event_id: eventId,
            leader_id: userId
        };

        try {
            const res = await axios.post("http://localhost:8000/join", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log(res.data);
            if (handleClick) {
                handleClick()
                setMessage(res.data);
            }
        } catch (error) {
            console.error(error);
            console.log({ "Payload": payload })
        }
    };

    return (
        <div className="rounded max-w-lg mx-auto mb-6">

            <div className="flex w-full gap-1 mb-3">
                <button onClick={() => setTeamBox("create")} className={`${teamBox === "create" ? "bg-gray-300" : 'border border-gray-300'} w-1/2 py-1 rounded`}>Create</button>
                <button onClick={() => setTeamBox("join")} className={`${teamBox === "create" ? "border border-gray-300" : 'bg-gray-300'} w-1/2 py-1 rounded`}>Join</button>
            </div>


            {teamBox === "create" ? <div className="flex gap-1">
                <input
                    type="text"
                    placeholder="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    className="w-10/12 focus:outline-none border-b h-10 px-2"
                />
                <button
                    onClick={handleCreateTeam}
                    className="h-10 w-2/12 bg-blue-500 text-white rounded-full"
                >
                    <Check className="mx-auto" size={20} />
                </button>
            </div>
                :
                <div className="flex gap-1">
                    {/* <input
                        type="number"
                        placeholder="Enter Team Code"
                        value={user}
                        onChange={(e) => setuser(e.target.value)}
                        className="w-2/12  focus:outline-none border-b h-10 px-2 mb-2"
                    /> */}
                    <input
                        type="text"
                        placeholder="Enter Team Code"
                        value={joinCode}
                        onChange={(e) => setJoinCode(e.target.value)}
                        className="w-10/12 focus:outline-none border-b h-10 px-2 mb-2"
                    />
                    <button
                        onClick={handleJoinTeam}
                        className="h-10 w-2/12 bg-green-700 text-white rounded-full"
                    >
                        <Check className="mx-auto" size={20} />
                    </button>
                </div>}


            {/* Message */}
            {message.join_code && (
                <div className="p-3 flex justify-between bg-gray-200 rounded mt-4">
                    {`${message.join_code}` || ''}
                    <button>
                        <Copy size={18} onClick={() => navigator.clipboard.writeText(message.join_code)} />
                    </button>
                </div>
            )}


        </div>
    );
}
