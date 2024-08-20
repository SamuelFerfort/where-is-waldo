import PropTypes from "prop-types";
import { useState, useEffect } from "react";

const TargetingBox = ({ x, y, isVisible }) => {
  const [boxSize, setBoxSize] = useState({ width: 50, height: 50 });

  useEffect(() => {
    const handleResize = () => {
      // Adjust these breakpoints as needed
      if (window.innerWidth < 480) {
        setBoxSize({ width: 30, height: 30 });
      } else if (window.innerWidth < 768) {
        setBoxSize({ width: 40, height: 40 });
      } else {
        setBoxSize({ width: 50, height: 50 });
      }
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const boxStyle = {
    display: isVisible ? "block" : "none",
    position: "absolute",
    left: `${x - boxSize.width / 2}px`,
    top: `${y - boxSize.height / 2}px`,
    width: `${boxSize.width}px`,
    height: `${boxSize.height}px`,
    border: "2px solid",
    borderRadius: "50%",
    pointerEvents: "none",
  };  

  
  
  return (
    <>
      <div style={boxStyle} className="neon-text neon-border" />
    </>
  );
};

TargetingBox.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  isVisible: PropTypes.bool,
};

export default TargetingBox;
