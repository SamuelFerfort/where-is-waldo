import PropTypes from "prop-types";

const NeonCheckmark = ({ x, y }) => {
  return (
    <div
      className="absolute w-6 h-6 flex items-center justify-center"
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
          stroke="#bc13fe"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="neon-text-subtle"
        />
      </svg>
    </div>
  );
};

NeonCheckmark.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export default NeonCheckmark;
