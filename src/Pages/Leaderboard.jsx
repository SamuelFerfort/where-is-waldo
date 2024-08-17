import { useQuery } from "@tanstack/react-query";
import formatTime from "../utils/formatTime";
import { useState } from "react";
import useTitle from "../hooks/useTitle";
import formatTimestamp from "../utils/formatTimestamp";


export default function Leaderboard() {
  const [imageFilter, setImageFilter] = useState(null);
  const {
    isPending,
    data: leaderboard,
    error,
  } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () =>
      fetch("http://localhost:3000/api/leaderboard").then((res) => res.json()),
  });
  const { data: images } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return fetch("http://localhost:3000/api/images").then((res) =>
        res.json()
      );
    },
  });

  useTitle("Leaderboard");

  function handleClick(e) {
    const filter = e.currentTarget.dataset.id;
    console.log(filter);
    setImageFilter(filter);
  }

  if (isPending) return <p>Loading...</p>;
  if (error) return <p>Error fetching leaderboard {error.message}</p>;

  const filter = imageFilter ? imageFilter : images[0].id;

  const filteredLeaderboard = leaderboard.filter(
    (row) => row.imageId === filter
  );

  const title = images.find((img) => img.id === filter).title;

  return (
    <main className="p-7 flex flex-col items-center bg-gray-900 gap-10">
      <section className="grid grid-cols-3 w-full max-w-2xl gap-8">
        {images.map((image) => (
          <button
            key={image.id}
            className="w-full h-64 relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 "
            onClick={handleClick}
            data-id={image.id}
          >
            <img
              src={image.url}
              alt={image.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <span className="absolute bottom-2 left-2 text-white font-semibold text-sm ">
              {image.title}
            </span>
          </button>
        ))}
      </section>

      {filteredLeaderboard && filteredLeaderboard.length > 0 ? (
        <section className="w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-center">
            {title} Leaderboard
          </h1>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800">
                  <th className="p-2 text-left">Position</th>

                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Time</th>
                  <th className="p-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeaderboard.map((row, i) => (
                  <tr key={row.id} className="border-t border-gray-700">
                    <td className="p-2">{i + 1}</td>

                    <td className="p-2">{row.name}</td>
                    <td className="p-2">{formatTime(row.duration)}</td>
                    <td className="p-2">{formatTimestamp(row.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <h1 className="text-2xl font-bold">
          No leaderboard data, be the first one to beat the game!
        </h1>
      )}
    </main>
  );
}
