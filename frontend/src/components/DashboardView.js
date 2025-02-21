import { FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const sections = [
  {
    title: 'Scoring',
    items: [
      {
        name: 'Tables/Courts',
        description: 'Keep Score, manage tables, and matches.',
        link: '/courts',
      },
      {
        name: 'Team Matches',
        description: 'Team vs Team Competitions, manage team matches.',
        link: '/team-matches', // Add a link specifically here
      },
    ],
  },
  {
    title: 'Importable Players and Teams',
    items: [
      { name: 'Players', description: 'Manage Lists of Players.', link: './PlayersList' },
      { name: 'Teams', description: 'Configure Teams/Players for team matches.', link: './Myteam' },
    ],
  },
  {
    title: 'Scoreboards and Overlays',
    items: [
      { name: 'Scoreboards', description: 'View, edit, and customize your scoreboards.', link: null },
      { name: 'Dynamic URLs', description: 'Change Tables/Team Matches, same URL.', link: null },
      { name: 'Table/Court(s) Live Scoring', description: 'Share tables/courts for online scoring.', link: null },
    ],
  },
  {
    title: 'Account',
    items: [
      { name: 'Account Settings', description: 'View and edit your account.', link: null },
      { name: 'Tutorials (Coming Soon)', description: 'View Videos and Documentation.', link: null },
    ],
  },
];

export default function DashboardView() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-800 min-h-screen p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">Open Scoreboard Dashboard</h1>
      <div className="space-y-6">
        {sections.map((section, index) => (
          <div key={index} className="bg-white bg-opacity-10 rounded-xl p-5 shadow-md">
            <h2 className="text-2xl font-semibold mb-3">{section.title}</h2>
            <div className="space-y-4">
              {section.items.map((item, idx) => (
                item.link ? (
                  <Link
                    to={item.link}
                    key={idx}
                    className="block bg-white bg-opacity-20 hover:bg-opacity-40 transition rounded-lg p-4 flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-200">{item.description}</p>
                    </div>
                    <FaChevronRight className="text-xl" />
                  </Link>
                ) : (
                  <div
                    key={idx}
                    className="bg-white bg-opacity-20 hover:bg-opacity-40 transition rounded-lg p-4 flex justify-between items-center cursor-pointer"
                  >
                    <div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-200">{item.description}</p>
                    </div>
                    <FaChevronRight className="text-xl" />
                  </div>
                )
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
