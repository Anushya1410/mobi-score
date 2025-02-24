import { useState } from "react";
import { FaClock, FaUsers, FaHandshake, FaCogs, FaTableTennis } from "react-icons/fa";
import { MdSportsScore } from "react-icons/md";

export default function Board() {
  const [teams, setTeams] = useState({
    A: { name: "Team A", score: 0, color: "#00f8ff" },
    B: { name: "Team B", score: 0, color: "#ff004c" },
  });

  const [modal, setModal] = useState({ open: false, team: "A" });
  const [editData, setEditData] = useState({ name: "", color: "" });

  const changeScore = (team, delta) => {
    setTeams((prev) => ({
      ...prev,
      [team]: { ...prev[team], score: Math.max(0, prev[team].score + delta) },
    }));
  };

  const openEditModal = (team) => {
    setModal({ open: true, team });
    setEditData({ name: teams[team].name, color: teams[team].color });
  };

  const saveChanges = () => {
    setTeams((prev) => ({
      ...prev,
      [modal.team]: { ...prev[modal.team], name: editData.name, color: editData.color },
    }));
    setModal({ open: false, team: "" });
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-black text-white">
      {/* Top Bar */}
      <div className="w-full bg-gradient-to-r from-black to-blue-600 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Table 1</h1>
        <div className="flex space-x-6 text-xl">
          <FaClock />
          <MdSportsScore />
          <FaTableTennis />
          <FaUsers />
          <FaHandshake />
          <FaCogs />
        </div>
      </div>

      {/* Scoreboard */}
      <div className="flex flex-1">
        {["A", "B"].map((team) => (
          <div key={team} className="flex-1 flex flex-col items-center" style={{ backgroundColor: teams[team].color }}>
            <button
              className="text-center text-lg font-bold bg-gray-800 text-white p-3 w-3/4 border-2 border-white"
              onClick={() => openEditModal(team)}
            >
              {teams[team].name}
            </button>
            <div className="flex-1 flex flex-col items-center justify-center border border-white p-4 w-3/4">
              <button className="text-8xl text-white bg-black p-6 rounded-lg w-24 h-24 flex items-center justify-center" onClick={() => changeScore(team, 1)}>
                +
              </button>
            </div>
            <div className="flex items-center w-3/4 my-4">
              <span className="text-black bg-white px-2 py-1 text-lg font-bold">0</span>
              <span className="text-black bg-white px-6 py-3 text-5xl font-bold mx-auto">{teams[team].score}</span>
              <span className="text-black bg-white px-2 py-1 text-lg font-bold">0</span>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center border border-white p-4 w-3/4">
              <button className="text-8xl text-white bg-black p-6 rounded-lg w-24 h-24 flex items-center justify-center" onClick={() => changeScore(team, -1)}>
                -
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Team Modal */}
      {modal.open && (
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-lg font-bold mb-4">Edit Player</h2>
            <label className="block mb-2 text-gray-700">First Name</label>
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded mb-3 text-black text-lg"
              value={editData.name}
              onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
            <label className="block mb-2 text-gray-700">Jersey Color</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {["#000000", "#ff0000", "#ff8000", "#ffff00", "#00ff00", "#00f8ff", "#0000ff", "#8000ff", "#ff00ff"].map(
                (color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded ${color === editData.color ? "border-4 border-white" : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setEditData({ ...editData, color })}
                  />
                )
              )}
            </div>
            <div className="flex justify-between">
              <button className="bg-black text-white px-6 py-3 rounded text-lg" onClick={saveChanges}>
                Save
              </button>
              <button className="bg-gray-300 px-6 py-3 rounded text-lg" onClick={() => setModal({ open: false, team: "" })}>
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
