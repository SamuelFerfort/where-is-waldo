import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useTitle from "../hooks/useTitle";
import LeaderboardList from "../Components/LeaderboardList";
import ImageGrid from "../Components/ImageGrid";

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
  const {
    data: images,
    isPending: isImagesPending,
    error: imagesError,
  } = useQuery({
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

  if (isPending || isImagesPending) return <p>Loading...</p>;
  if (error) return <p>Error fetching leaderboard: {error.message}</p>;
  if (imagesError) return <p>Error fetching images: {imagesError.message}</p>;
  const filter = imageFilter ? imageFilter : images[0].id;

  const filteredLeaderboard = leaderboard.filter(
    (row) => row.imageId === filter
  );

  const title = images.find((img) => img.id === filter).title;

  return (
    <main className="p-7 flex flex-col items-center gap-10">
      <ImageGrid images={images} handleClick={handleClick} />
      <LeaderboardList
        filteredLeaderboard={filteredLeaderboard}
        title={title}
      />
    </main>
  );
}
