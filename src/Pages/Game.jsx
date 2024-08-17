import { useState, useEffect, useRef } from "react";
import TargetingBox from "../Components/TargetingBox";
import useFetchCharacters from "../hooks/useFetchGame";
import { useParams, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import formatTime from "../utils/formatTime";
import useTitle from "../hooks/useTitle";
import confetti from "canvas-confetti";
import WinDialog from "../Components/WinDialog";
import Characters from "../Components/Characters";

export default function Game() {
  const [isVisible, setIsVisible] = useState(null);
  const { imageId } = useParams();
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  const [charFoundMarkers, setCharFoundMarkers] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameEndTime, setGameEndTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const {
    title,
    imageURL,
    isLoading,
    error,
    characters,
    updateCharactersFound,
    gameStartTime,
  } = useFetchCharacters(`http://localhost:3000/api/images/${imageId}`);

  const dialogRef = useRef(null);
  const navigate = useNavigate();
  useTitle(title);

  useEffect(() => {
    let timer;
    if (gameStartTime && !isGameOver) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - gameStartTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStartTime, isGameOver]);

  useEffect(() => {
    if (characters.length > 0 && characters.every((char) => char.isFound)) {
      setIsGameOver(true);
      setGameEndTime(Date.now());
      confetti({
        particleCount: 3000,
        spread: 150,
        origin: { y: 0.6 },
        zIndex: 1000000,
      });
    }
  }, [characters]);

  async function handleWinSubmit(e) {
    e.preventDefault();
    const playerName = e.target.elements.name.value;
    const gameDuration = gameEndTime - gameStartTime;
    try {
      const response = await fetch("http://localhost:3000/api/leaderboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          duration: gameDuration,
          imageId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit score");
      }

      navigate(`/leaderboard`);
    } catch (error) {
      console.error("Error submitting score:", error);
      toast.error("Error checking coordinates. Please try again.");
    }
  }

  const handleSkip = () => {
    navigate(`/leaderboard`);
  };

  async function handleClick(e) {
    if (isGameOver) return;
    const rect = e.target.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
    const absoluteX = e.clientX - rect.left;
    const absoluteY = e.clientY - rect.top;

    console.log("X:", xPercent);
    console.log("Y:", yPercent);
    setCoordinates({ x: absoluteX, y: absoluteY });
    setIsVisible(true);
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
        data.foundCharacters.forEach((charName) => {
          const alreadyFound = characters.find(
            (char) => char.name === charName && char.isFound
          );
          if (alreadyFound) return;

          toast.success(`You found ${charName}!`);
          updateCharactersFound(charName);
          setCharFoundMarkers([
            ...charFoundMarkers,
            { x: xPercent, y: yPercent, name: charName },
          ]);
        });
      } else {
        toast.error("Nope! Try again");
      }
    } catch (err) {
      console.error("Error checking coordinates", err);
    } finally {
      setIsVisible(false);
    }
  }
  useEffect(() => {
    if (isGameOver && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isGameOver]);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  return (
    <main>
      <Toaster position="top-center" />
      <WinDialog
        handleWinSubmit={handleWinSubmit}
        handleSkip={handleSkip}
        dialogRef={dialogRef}
      />
      <Characters
        elapsedTime={elapsedTime}
        gameStartTime={gameStartTime}
        characters={characters}
      />
      <section className="cursor-crosshair absolute" onClick={handleClick}>
        <img
          className="h-full w-full object-cover"
          src={imageURL}
          alt={title}
        />
        {charFoundMarkers.map((mark, index) => (
          <div
            key={index}
            className="absolute w-4 h-4 bg-green-500 rounded-full border-2 border-white"
            style={{
              left: `${mark.x}%`,
              top: `${mark.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          ></div>
        ))}
        <TargetingBox
          x={coordinates.x}
          y={coordinates.y}
          isVisible={isVisible}
        />
      </section>
    </main>
  );
}
