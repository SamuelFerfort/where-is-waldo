import aquatic from "../assets/images/aquatic-aquarium.webp";
import { useState } from "react";
import TargetingBox from "../Components/TargetingBox";

export default function Game() {
  const [isVisible, setIsVisible] = useState(null);
  const [coordinates, setCoordinates] = useState({ x: null, y: null });
  async function handleClick(e) {
    const rect = e.target.getBoundingClientRect();
    
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const absoluteX = (xPercent / 100) * rect.width;
    const absoluteY = (yPercent / 100) * rect.height;

    // TODO:  fetch the backend to check if I clicked on a character using xPercent and Ypercent?
    console.log(xPercent, yPercent);
 

    setCoordinates({ x: absoluteX, y: absoluteY });
    setIsVisible(!isVisible);
  }

  return (
    <main>
      <section className="cursor-crosshair absolute" onClick={handleClick}>
        <img className="h-full w-full object-cover" src={aquatic} alt="" />
        <TargetingBox
          x={coordinates.x}
          y={coordinates.y}
          isVisible={isVisible}
        />
      </section>
    </main>
  );
}
