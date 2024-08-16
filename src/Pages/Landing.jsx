import ImageCard from "../Components/ImageCard";
import { useQuery } from "@tanstack/react-query";
import useTitle from "../hooks/useTitle";

export default function Landing() {
  const {
    data: images,
    error,
    isPending,
  } = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      return fetch("http://localhost:3000/api/images").then((res) =>
        res.json()
      );
    },
  });

  useTitle("Home")

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error {error.message} </p>;
  }

  return (
    <main className="p-7 flex justify-center pt-20 bg-gray-900 ">
      <section className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl">Games</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          {images.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              url={image.url}
              title={image.title}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
