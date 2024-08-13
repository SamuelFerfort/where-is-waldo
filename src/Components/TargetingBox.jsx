import PropTypes from "prop-types";

const TargetingBox = ({ x, y, isVisible }) => {
  const boxWidth = 50;
  const boxHeight = 50;

  const boxStyle = {
    display: isVisible ? "block" : "none",
    position: "absolute",
    left: `${x - boxWidth / 2}px`,
    top: `${y - boxHeight / 2}px`,
    width: `${boxWidth}px`,
    height: `${boxHeight}px`,
    border: "2px solid red",
    borderRadius: "50%",
    pointerEvents: "none",
  };  

  

  return (
    <>
      <div style={boxStyle} />
    </>
  );
};

TargetingBox.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  isVisible: PropTypes.bool,
};

export default TargetingBox;
