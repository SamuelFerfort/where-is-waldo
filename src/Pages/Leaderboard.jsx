import { useQuery } from "@tanstack/react-query";

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
        {leaderboard && leaderboard.length > 0 ? (
          <ul>
            {leaderboard.map((line) => (
              <li key={line.id}>{line.name}</li>
            ))}
          </ul>
        ) : (
          <p>No leaderboard data available</p>
        )}
      </header>
    </main>
  );
}
