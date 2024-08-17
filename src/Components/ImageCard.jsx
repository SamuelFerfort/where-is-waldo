import { Link } from "react-router-dom";
import PropTypes from "prop-types";

ImageCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
};

export default function ImageCard({ url, title, id }) {
  return (
    <Link
      to={`/game/${id}`}
      className="rounded-sm hover:scale-105 transition-transform relative hover:contrast-75"
    >
      <article className=" bg-gray-800 rounded-lg w-80 h-96">
          <img
            src={url}
            alt=""
            className="w-full h-full bg-white object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-2 left-2 text-white font-semibold text-sm ">
            {title}
          </span>
      </article>
    </Link>
  );
}
