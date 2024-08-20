import formatTime from "../utils/formatTime";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function Characters({ characters, gameStartTime, elapsedTime }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setIsSticky(offset > 100); // Adjust this value based on when you want it to stick
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="flex flex-col justify-center items-center ">
      {characters && (
        <div
          className={`
          flex justify-center items-center flex-wrap 
            gap-2 sm:gap-4 z-10 bg-opacity-70
           right-9
          ${isSticky ? "fixed top-4 " : "absolute top-16 sm:top-20   "}
        `}
        >
          {characters.map((char) => (
            <div
              key={char.id}
              className={`
          relative sm:w-24 sm:h-24 w-16 h-16 flex items-center justify-center
          bg-purple-600 bg-opacity-20 rounded-lg overflow-hidden
          ${
            char.isFound
              ? "opacity-50 grayscale"
              : "hover:scale-110 transition-all duration-300 hover:bg-opacity-30 "
          }
        `}
            >
              <img
                src={char.picture}
                alt={char.name}
                className="max-w-full max-h-full object-contain p-1"
              />
              {char.isFound && (
                <div className="absolute inset-0 rounded-lg "></div>
              )}
              <span
                className={`absolute bottom-0 left-0 right-0 text-center text-white text-xs py-1 px-2 bg-black bg-opacity-70 ${
                  char.isFound ? "line-through" : ""
                }`}
              >
                {char.name}
              </span>
            </div>
          ))}
        </div>
      )}
      {gameStartTime && (
        <p className="text-base  sm:text-3xl font-bold neon-text-subtle absolute top-2 sm:top-3">
          {formatTime(elapsedTime)}
        </p>
      )}
    </section>
  );
}

Characters.propTypes = {
  characters: PropTypes.array,
  gameStartTime: PropTypes.number,
  elapsedTime: PropTypes.number,
};
