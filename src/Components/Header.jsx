import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white p-3 shadow-md">
      <div className="flex justify-around items-center">
        <Link to="/">Where is Waldo</Link>

        <Link to="/leaderboard">Leaderboard</Link>
      </div>
    </header>
  );
}
