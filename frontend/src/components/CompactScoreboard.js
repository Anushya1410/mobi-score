import React, { useState } from "react";

const CompactScoreboard = () => {
  const [teams, setTeams] = useState([
    { name: "Team A", score: 0, color: "#3F51B5" },
    { name: "Team B", score: 0, color: "#3F51B5" },
  ]);

  const updateScore = (index, delta) => {
    setTeams((prev) => {
      const updatedTeams = [...prev];
      updatedTeams[index].score += delta;
      return updatedTeams;
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col space-y-2">
        {teams.map((team, index) => (
          <div
            key={index}
            className="flex items-center px-4 py-2 rounded-lg shadow-lg"
            style={{ backgroundColor: team.color }}
          >
            <span className="text-white font-bold text-lg px-2">0</span>
            <span className="text-white font-bold text-lg px-2">J</span>
            <span className="text-white font-bold text-lg px-4">{team.name}</span>
            <button
              className="bg-white text-black text-xl font-bold px-4 py-2 mx-2 rounded-md"
              onClick={() => updateScore(index, 1)}
            >
              {team.score}
            </button>
            <button
              className="bg-white text-black text-xl font-bold px-4 py-2 mx-2 rounded-md"
              onClick={() => updateScore(index, -1)}
            >
              0
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompactScoreboard;
