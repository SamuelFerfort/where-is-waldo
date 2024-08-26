import { useState, useEffect } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-20">
      <div className="text-center">
        <p className="mt-4 text-xl neon-text-subtle font-semibold">
          Loading{dots}
        </p>
      </div>
    </main>
  );
}
