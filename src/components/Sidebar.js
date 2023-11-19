import React from "react";
import "./Sidebar.css";

const Sidebar = ({
  gridSize,
  setGridSize,
  selectedAlgorithm,
  setSelectedAlgorithm,
  algorithms,
  findPath,
  handleGenerateMaze,
}) => {
  const handleSliderChange = (event) => {
    setGridSize(Number(event.target.value));
  };

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  return (
    <div className="sidebar">
      <label htmlFor="grid-size-slider">
        Grid Size: {gridSize}x{gridSize}
      </label>
      <input
        id="grid-size-slider"
        type="range"
        min="8"
        max="32"
        value={gridSize}
        onChange={handleSliderChange}
      />
      <div className="algorithm-controls">
        <select value={selectedAlgorithm} onChange={handleAlgorithmChange}>
          {algorithms.map((algorithm, index) => (
            <option key={index} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
        <button onClick={findPath}>Find Path</button>
        <button onClick={handleGenerateMaze}>Generate Maze</button>
      </div>
    </div>
  );
};

export default Sidebar;
