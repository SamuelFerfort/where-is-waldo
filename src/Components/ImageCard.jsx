import PropTypes from "prop-types";

ImageCard.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
};

export default function ImageCard({ url, title }) {
  return (
    <article className=" bg-gray-800 rounded-lg w-80">
      <img src={url} alt="" className="w-full h-auto bg-white" />
      <div className="p-4 flex flex-col items-center gap-4">
        <h2>{title}</h2>
        <button className="bg-sky-500 py-1 px-2 rounded">Start Game</button>
      </div>
    </article>
  );
}



