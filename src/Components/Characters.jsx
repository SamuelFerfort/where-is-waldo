import formatTime from "../utils/formatTime";
import PropTypes from "prop-types";

export default function Characters({ characters, gameStartTime, elapsedTime }) {
  return (
    <section className="flex flex-col justify-center items-center p-3 ">
      {characters && (
        <div className="flex gap-4 p-4 bg-gray-800 rounded-xl shadow-lg">
          {characters.map((char) => (
            <div
              key={char.id}
              className={`
          relative w-24 h-24 flex items-center justify-center
          bg-white bg-opacity-10 rounded-lg overflow-hidden
          ${
            char.isFound
              ? "opacity-50 grayscale"
              : "hover:scale-110 transition-all duration-300 hover:bg-opacity-20"
          }
        `}
            >
              <img
                src={char.picture}
                alt={char.name}
                className="max-w-full max-h-full object-contain p-2"
              />
              {char.isFound && (
                <div className="absolute inset-0 rounded-lg "></div>
              )}
              <span className="absolute bottom-0 left-0 right-0 text-center text-white text-xs py-1 px-2 bg-black bg-opacity-70">
                {char.name}
              </span>
            </div>
          ))}
        </div>
      )}
      {gameStartTime && (
        <p className="text-2xl font-bold text-white absolute top-4">
          {formatTime(elapsedTime)}
        </p>
      )}
    </section>
  );
}

Characters.propTypes = {
  characters: PropTypes.array,
  gameStartTime: PropTypes.string,
  elapsedTime: PropTypes.string,
};
