import PropTypes from "prop-types";

Dropdown.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};




export default function Dropdown({ x, y }) {
  const dropdownStyle = {
    position: "absolute",
    left: `${x + 30}px`,
    top: `${y - 5}px`,
    zIndex: 1000,
  };
  return (
    <div style={dropdownStyle} className="p-3 rounded-md bg-gray-800 ">
      <ul className="flex flex-col gap-3">
        <li className="p-1 cursor-pointer hover:bg-gray-700">Character 1</li>
        <li className="p-1 cursor-pointer hover:bg-gray-700">Character 2</li>
        <li className="p-1 cursor-pointer hover:bg-gray-700">Character 3</li>
      </ul>
    </div>
  );
}
