import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function ImageCard({ url, title, id }) {
  return (
    <Link
      to={`/game/${id}`}
      className="group relative w-80 h-96 rounded-lg overflow-hidden neon-border transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
    >
      <article className="w-full h-full bg-gray-800 rounded-lg">
        <img
          src={url}
          alt={title}
          className="w-full h-full object-cover transition-all duration-300 group-hover:contrast-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 bg-purple-900/80">
          <span className="block text-lg font-bold neon-text-subtle">{title}</span>
        </div>
      </article>
    </Link>
  );
}

ImageCard.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};