import formatTime from "../utils/formatTime";
import formatTimestamp from "../utils/formatTimestamp";
import PropTypes from "prop-types";

const LeaderboardList = ({ filteredLeaderboard, title }) => {
  if (!filteredLeaderboard || filteredLeaderboard.length === 0) {
    return (
      <h1 className="text-2xl font-bold text-white neon-text-subtle">
        No leaderboard data, be the first one to beat the game!
      </h1>
    );
  }

  return (
    <section className="w-full max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center text-white neon-text">
        {title}
      </h1>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg neon-border">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-900 to-indigo-900">
              <th className="p-3 text-left text-white">Pos</th>
              <th className="p-3 text-left text-white">Name</th>
              <th className="p-3 text-left text-white">Time</th>
              <th className="p-3 text-left text-white">Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeaderboard.map((row, i) => (
              <tr
                key={row.id}
                className="border-t border-gray-700 hover:bg-gray-700 transition-colors duration-150"
              >
                <td className="p-3 text-white">{i + 1}</td>
                <td className="p-3 text-white font-semibold">{row.name}</td>
                <td className="p-3 text-purple-300">
                  {formatTime(row.duration)}
                </td>
                <td className="p-3 text-gray-400">
                  {formatTimestamp(row.timestamp)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

LeaderboardList.propTypes = {
  filteredLeaderboard: PropTypes.array,
  title: PropTypes.string,
};

export default LeaderboardList;
