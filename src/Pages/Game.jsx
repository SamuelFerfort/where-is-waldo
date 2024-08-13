import { useState, useEffect } from "react";
import TargetingBox from "../Components/TargetingBox";
import useFetchCharacters from "../hooks/useFetchGame";
import { useParams, useNavigate } from "react-router-dom";
export default function Game() {
  const [isVisible, setIsVisible] = useState(null);
  const { imageId } = useParams();
  const [gameStartTime, setGameStartTime] = useState(null)
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [message, setMessage] = useState(null);
  const [showWinDialog, setShowWinDialog] = useState(false);
  const { imageURL, isLoading, error, characters, updateCharactersFound } =
    useFetchCharacters(`http://localhost:3000/api/images/${imageId}`);

  const dialogRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setGameStartTime(Date.now());
  }, []);

  async function handleWinSubmit(e) {
    e.preventDefault()
    const playerName = e.target.elements.name.value
    const gameEndTime = Date.now()
    const gameDuration = gameEndTime - gameStartTime
    try {
      const response = await fetch('http://localhost:3000/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: playerName,
          time: gameDuration,
          imageId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit score');
      }

      navigate('/leaderboard');
    } catch (error) {
      console.error('Error submitting score:', error);
      setMessage('Failed to submit score. Please try again.');
    }
  }

  

  async function handleClick(e) {
    const rect = e.target.getBoundingClientRect();

    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const absoluteX = (xPercent / 100) * rect.width;
    const absoluteY = (yPercent / 100) * rect.height;
    try {
      const response = await fetch(`http://localhost:3000/api/characters/`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ x: xPercent, y: yPercent, imageId }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.isFound) {
        setMessage(data.message);
        data.foundCharacters.forEach((charName) => {
          updateCharactersFound(charName);
        });
      } else {
        setMessage("Try again!");
      }
    } catch (err) {
      console.error("Error checking coordinates", err);
      setMessage("An error occurred. Please try again.");
    }

    setCoordinates({ x: absoluteX, y: absoluteY });
    setIsVisible(!isVisible);
  }

  useEffect(() => {
    if (characters.every((char) => char.isFound)) {
      dialogRef.current?.showModal();
    }
  }, [characters]);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;


  return (
    <main>
      <dialog ref={dialogRef} className="p-4 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold mb-4">Congratulations, you won!</h2>
        <form onSubmit={handleWinSubmit}>
          <label htmlFor="name" className="block mb-2">
            Enter your name:
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit Score
          </button>
        </form>
      </dialog>
      <section className="character-list mb-4">
        <h2 className="text-xl font-bold mb-2">Characters to Find:</h2>
        <div className="flex space-x-4">
          {characters.map((char) => (
            <div
              key={char.name}
              className={`character ${
                char.isFound ? "line-through text-gray-500" : ""
              }`}
            >
              {char.name}
            </div>
          ))}
        </div>
      </section>
      <section className="cursor-crosshair absolute" onClick={handleClick}>
        <img className="h-full w-full object-cover" src={imageURL} alt="" />
        <TargetingBox
          x={coordinates.x}
          y={coordinates.y}
          isVisible={isVisible}
        />
      </section>
      {message && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white p-2 rounded">
          {message}
        </div>
      )}
    </main>
  );
}
