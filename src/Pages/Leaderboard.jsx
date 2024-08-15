import { useQuery } from "@tanstack/react-query";
import formatTime from "../utils/formatTime";

export default function Leaderboard() {
  const {
    isPending,
    data: leaderboard,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      fetch("http://localhost:3000/api/leaderboard").then((res) => res.json()),
  });

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error fetching leaderboard {error.message}</p>;

  return (
    <main className="p-7 flex flex-col items-center bg-gray-900">
      {leaderboard && leaderboard.length > 0 ? (
        <section>
          <h1>Leaderboard</h1>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((row) => (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <h1>No leaderboard data, be the first one to beat the game!</h1>
      )}
    </main>
  );
}
