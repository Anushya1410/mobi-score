import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardView from './components/DashboardView';
import Scoreboard from './components/Scoreboard';
import MyTeamMatches from './components/MyTeamMatches';
import Courts from './components/courts';
import PlayersList from './components/playerslist';
import Team from './components/team';
import Board from './components/board';
import CompactScoreboard from './components/CompactScoreboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardView />} />
        <Route path="/scoreboard" element={<Scoreboard />} />
        <Route path="/team-matches" element={<MyTeamMatches />} />
        <Route path="/courts" element={<Courts />} />
        <Route path="/PlayersList" element={<PlayersList />} />
        <Route path="/Myteam" element={<Team />} />
        <Route path="/board" element={<Board />} />
        <Route path="/ui" element={<CompactScoreboard />} />
      </Routes>
    </Router>
  );
}

export default App;
