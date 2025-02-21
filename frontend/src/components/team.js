import { useState, useEffect } from "react";
import axios from "axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const Team = () => {
  const [teams, setTeams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPlayerForm, setShowPlayerForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: "", logoUrl: "", players: [] });
  const [newPlayer, setNewPlayer] = useState({ firstName: "", lastName: "", imageUrl: "" });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/teams");
      setTeams(res.data);
    } catch (error) {
      console.error("❌ Error fetching teams:", error);
    }
  };

  const handleTeamChange = (e) => {
    setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
  };

  const handlePlayerChange = (e) => {
    setNewPlayer({ ...newPlayer, [e.target.name]: e.target.value });
  };

  const addPlayer = () => {
    if (newPlayer.firstName && newPlayer.lastName) {
      setNewTeam({ ...newTeam, players: [...newTeam.players, newPlayer] });
      setNewPlayer({ firstName: "", lastName: "", imageUrl: "" });
      setShowPlayerForm(false);
    }
  };

  const saveTeam = async () => {
    if (!newTeam.name || !newTeam.logoUrl) {
      alert("⚠️ Please enter team name and logo URL!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/teams", newTeam);
      setTeams([...teams, res.data]); // Update UI immediately
      setShowForm(false);
      setNewTeam({ name: "", logoUrl: "", players: [] });
    } catch (error) {
      console.error("❌ Error saving team:", error);
    }
  };

  const deletePlayer = async (teamId, playerId) => {
    try {
      await axios.delete(`http://localhost:5000/api/teams/${teamId}/players/${playerId}`);
      fetchTeams();
    } catch (error) {
      console.error("❌ Error deleting player:", error);
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-black to-blue-500 text-white p-4 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">My Teams</h1>
        <button className="text-2xl bg-white p-2 rounded-full text-black shadow-md hover:scale-110 transition"
          onClick={() => setShowForm(true)}>
          <FaPlus />
        </button>
      </div>

      {/* Team List */}
      <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div key={team._id} className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
            <div className="flex items-center space-x-4">
              <img src={team.logoUrl} alt="Team Logo" className="w-16 h-16 rounded-lg shadow-md" />
              <h2 className="text-xl font-semibold">{team.name}</h2>
            </div>

            <h3 className="mt-4 font-semibold text-gray-700">Players:</h3>
            <div className="space-y-2 mt-2">
              {team.players.map((player) => (
                <div key={player._id} className="flex justify-between items-center bg-gray-100 p-2 rounded shadow-sm">
                  <span className="text-gray-800 font-medium">{player.firstName} {player.lastName}</span>
                  <button onClick={() => deletePlayer(team._id, player._id)} className="p-2 rounded-lg text-red-500 hover:bg-red-100 transition">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* New Team Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">New Team</h2>

            <label className="block font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              name="name"
              value={newTeam.name}
              onChange={handleTeamChange}
              placeholder="Enter team name"
              className="w-full border p-2 mb-3 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-medium text-gray-700">Team Logo URL</label>
            <input
              type="text"
              name="logoUrl"
              value={newTeam.logoUrl}
              onChange={handleTeamChange}
              placeholder="Paste logo URL"
              className="w-full border p-2 mb-3 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
            />

            <button
              onClick={() => setShowPlayerForm(true)}
              className="w-full bg-gray-900 text-white py-2 rounded shadow-md hover:bg-gray-700 transition"
            >
              Add Player
            </button>

            <div className="mt-4 flex space-x-2">
              <button onClick={saveTeam} className="w-full bg-blue-500 text-white py-2 rounded shadow-md hover:bg-blue-700 transition">
                Save Team
              </button>
              <button onClick={() => setShowForm(false)} className="w-full bg-gray-500 text-white py-2 rounded shadow-md hover:bg-gray-700 transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Player Form */}
      {showPlayerForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">
            <h2 className="text-2xl font-bold mb-4 text-center">New Player</h2>

            <label className="block font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={newPlayer.firstName}
              onChange={handlePlayerChange}
              placeholder="Enter first name"
              className="w-full border p-2 mb-3 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
            />

            <label className="block font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={newPlayer.lastName}
              onChange={handlePlayerChange}
              placeholder="Enter last name"
              className="w-full border p-2 mb-3 rounded shadow-sm focus:ring-2 focus:ring-blue-400"
            />

            <div className="mt-4 flex space-x-2">
              <button onClick={addPlayer} className="w-full bg-gray-900 text-white py-2 rounded shadow-md hover:bg-gray-700 transition">
                Add Player
              </button>
              <button onClick={() => setShowPlayerForm(false)} className="w-full bg-gray-500 text-white py-2 rounded shadow-md hover:bg-gray-700 transition">
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;
