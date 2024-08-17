import PropTypes from "prop-types";

const ImageGrid = ({ images, handleClick }) => {
  return (
    <section className="grid grid-cols-3 w-full max-w-2xl gap-8">
      {images.map((image) => (
        <button
          key={image.id}
          className="w-full h-64 relative overflow-hidden rounded-lg shadow-lg transition-transform hover:scale-105 hover:contrast-75"
          onClick={handleClick}
          data-id={image.id}
        >
          <img
            src={image.url}
            alt={image.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className="absolute bottom-2 left-2 text-white font-semibold text-sm">
            {image.title}
          </span>
        </button>
      ))}
    </section>
  );
};

ImageGrid.propTypes = {
  images: PropTypes.array,
  handleClick: PropTypes.func,
};

export default ImageGrid;
