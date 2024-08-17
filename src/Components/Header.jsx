import { Link } from "react-router-dom";
export default function Header() {
  return (
    <header className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold neon-text">
          Waldoverse
        </Link>
        <Link to="/leaderboard" className="text-2xl neon-text-subtle">
          Leaderboard
        </Link>
      </div>
    </header>
  );
}
