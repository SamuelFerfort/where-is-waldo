import { useState, useEffect, useRef } from "react";
import TargetingBox from "../Components/TargetingBox";
import useFetchCharacters from "../hooks/useFetchGame";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useTitle from "../hooks/useTitle";
import confetti from "canvas-confetti";
import WinDialog from "../Components/WinDialog";
import Characters from "../Components/Characters";
import StyledToaster from "../Components/StyledToaster";
import Loading from "../Components/Loading";
import Error from "../Components/Error";
import Checkmark from "../Components/Checkmark";

const API_URL = import.meta.env.VITE_API_URL;

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
    sessionToken,
  } = useFetchCharacters(`${API_URL}api/images/${imageId}`);

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
      const duration = 5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
      };

      const randomInRange = (min, max) => Math.random() * (max - min) + min;

      const intervalId = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(intervalId);
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
            colors: ["#ff00ff", "#00ffff", "#ff00ff", "#ff00ff"],
            emojis: ["🔍", "✨", "🎉"],
            scalar: randomInRange(0.9, 1.1),
          })
        );
        confetti(
          Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
            colors: ["#00ffff", "#ff00ff", "#ffff00", "#00ffff"],
            emojis: ["🔍", "✨", "🎉"],
            scalar: randomInRange(0.9, 1.1),
          })
        );
      }, 250);
    }
  }, [characters]);

  async function handleWinSubmit(e) {
    e.preventDefault();
    const playerName = e.target.elements.name.value;
    const gameDuration = gameEndTime - gameStartTime;
    try {
      const response = await fetch(`${API_URL}api/leaderboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: playerName,
          duration: gameDuration,
          imageId,
          sessionToken,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to submit score");
      }

      navigate(`/leaderboard`);
    } catch (error) {
      console.error("Error submitting score:", error.message);
      toast.error(error.message || "Error submitting score. Please try again.");
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
      const response = await fetch(`${API_URL}api/characters/`, {
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

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <main >
      <StyledToaster />
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
      <section className="cursor-crosshair relative  " onClick={handleClick}>
        <img
          className=" h-full w-full object-cover"
          src={imageURL}
          alt={title}
        />
        {charFoundMarkers.map((mark, index) => (
          <Checkmark key={index} x={mark.x} y={mark.y} />
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
