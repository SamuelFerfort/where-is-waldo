import { useQuery } from "@tanstack/react-query";

const formatDuration = (milliseconds) => {
  const minutes = Math.floor(milliseconds / 60000);
  const seconds = Math.floor((milliseconds % 60000) / 1000);
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`
};

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
      <header>
        <section>
          <h1>Leaderboard</h1>
        </section>
        {leaderboard && leaderboard.length > 0 ? (
          <ul>
            {leaderboard.map((line) => (
              <li key={line.id}>
                {line.name} {formatDuration(line.duration)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No leaderboard data available</p>
        )}
      </header>
    </main>
  );
}
