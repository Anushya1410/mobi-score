import React, { useState } from "react";

const MyTeamMatches = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="w-full h-screen flex flex-col bg-gray-300">
      <div className="bg-gradient-to-r from-black to-blue-600 text-white p-4 flex items-center">
        <button className="text-xl mr-4" onClick={() => window.history.back()}>
          &#x2190;
        </button>
        <h1 className="text-lg font-semibold">My Team Matches</h1>
        <div
          className="ml-auto text-xl cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          +
        </div>
      </div>

      {/* No Matches Section */}
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-bold">You have no Team Matches.</h2>
        <button
          className="bg-black text-white px-6 py-2 mt-4"
          onClick={() => setModalOpen(true)}
        >
          Create One!
        </button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-bold">New Team Match</h3>
              <button
                className="text-lg"
                onClick={() => setModalOpen(false)}
              >
                &times;
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block font-semibold">Team A</label>
                <select className="w-full p-2 border rounded">
                  <option>Select Team</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold">Team B</label>
                <select className="w-full p-2 border rounded">
                  <option>Select Team</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold">Match Time</label>
                <input type="date" className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block font-semibold">Sport</label>
                <select className="w-full p-2 border rounded">
                  <option>Table Tennis</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button className="bg-black text-white px-4 py-2 rounded">
                Create
              </button>
              <button
                className="px-4 py-2"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTeamMatches;
