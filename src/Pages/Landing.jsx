import aquaticImage from "../assets/images/aquatic-aquarium.webp"
import { Link } from "react-router-dom";
import ImageCard from "../Components/ImageCard";


export default function Landing() {
  return (
    <main className="p-7 flex justify-center pt-20 bg-gray-900 ">
      <section className="flex flex-col gap-8 items-center">
        <h1 className="text-4xl">Games</h1>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-3">
          <ImageCard url={aquaticImage} title="Hello, world" /> 
          <article className=" bg-gray-800 rounded-lg w-80">
            <img
              src={aquaticImage}
              alt=""
              className="w-full h-auto bg-white"
            />
            <div className="p-4 flex flex-col items-center gap-4">
              <h2>Dragon Charmer Island</h2>
              
              <Link to="/game" className="bg-sky-500 py-1 px-2 rounded">Start Game</Link>
            </div>
          </article>        

          <article className=" bg-gray-800 rounded-lg w-80">
            <img
              src={aquaticImage}
              alt=""
              className="w-full h-auto bg-white"
            />
            <div className="p-4 flex flex-col items-center gap-4">
              <h2>Dragon Charmer Island</h2>
              <button className="bg-sky-500 py-1 px-2 rounded">Start Game</button>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
