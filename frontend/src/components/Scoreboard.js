import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function Scoreboard() {
  const [score, setScore] = useState({ teamA: 0, teamB: 0 });

  useEffect(() => {
    axios.get('http://localhost:5000/score').then((res) => setScore(res.data));

    socket.on('scoreUpdate', (updatedScore) => {
      setScore(updatedScore);
    });

    return () => socket.off('scoreUpdate');
  }, []);

  const updateScore = (team, value) => {
    const updatedScore = { ...score, [team]: score[team] + value };
    axios.post('http://localhost:5000/score', updatedScore);
  };

  const resetScores = () => {
    axios.post('http://localhost:5000/score', { teamA: 0, teamB: 0 });
  };

  return (
    <div className="bg-gray-100 p-10 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-5">MATCH DAY</h1>

      <div className="flex gap-10">
        <div className="bg-gray-200 p-5 rounded-lg shadow-lg text-center border border-black">
          <h2 className="text-2xl font-bold">TEAM A</h2>
          <p className="text-lg">Show the Score</p>
          <p className="text-lg">{score.teamA}</p>
          <button className="border border-black px-2" onClick={() => updateScore('teamA', 1)}>+</button>
          <button className="border border-black px-2 ml-2" onClick={() => updateScore('teamA', -1)}>-</button>
        </div>

        <div className="bg-gray-200 p-5 rounded-lg shadow-lg text-center border border-black">
          <h2 className="text-2xl font-bold">TEAM B</h2>
          <p className="text-lg">Show the Score</p>
          <p className="text-lg">{score.teamB}</p>
          <button className="border border-black px-2" onClick={() => updateScore('teamB', 1)}>+</button>
          <button className="border border-black px-2 ml-2" onClick={() => updateScore('teamB', -1)}>-</button>
        </div>
      </div>

      <h2 className="text-3xl font-bold my-5">RESULT DECLARED</h2>
      <div className="bg-gray-200 p-3 rounded-lg border border-black">Live Scoring wait for Scoring</div>

      <button onClick={resetScores} className="bg-white border border-black mt-5 p-2 rounded-lg">Reset Scores</button>
    </div>
  );
}
