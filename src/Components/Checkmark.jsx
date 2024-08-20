import PropTypes from "prop-types";

const Checkmark = ({ x, y }) => {
  return (
    <div
      className="absolute w-4 h-4 sm:w-10 sm:h-10 flex items-center justify-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke="#00ff00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="checkmark-path"
        />
      </svg>
    </div>
  );
};

Checkmark.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Checkmark;
