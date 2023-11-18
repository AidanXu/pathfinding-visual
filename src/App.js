import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import { aStar } from "./components/AStarSearch";
import "./App.css";

function App() {
  // Convert gridSize into a state variable
  const [gridSize, setGridSize] = useState(12); // Default grid size is 12x12

  const [walls, setWalls] = useState(
    new Array(gridSize * gridSize).fill(false)
  );
  const [startNodeIndex, setStartNodeIndex] = useState(0);
  const [endNodeIndex, setEndNodeIndex] = useState(gridSize * gridSize - 1);

  // Function to handle changes in the slider
  const handleSliderChange = (event) => {
    setGridSize(Number(event.target.value));
  };

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("A* Search");

  // Algorithms list
  const algorithms = ["A* Search", "Greedy Best-first Search"];

  const handleAlgorithmChange = (e) => {
    setSelectedAlgorithm(e.target.value);
  };

  const [path, setPath] = useState([]);

  const drawPath = (foundPath) => {
    // Assuming foundPath is an array of indices representing the path
    setPath(foundPath);
  };

  const findPath = () => {
    const path = aStar(startNodeIndex, endNodeIndex, walls, gridSize);
    if (path) {
      drawPath(path);
      console.log(path);
    } else {
      console.log("No path found");
    }
  };

  return (
    <div className="App">
      <Navbar />
      <div className="sidebar-space">
        <div className="sidebar">
          <label htmlFor="grid-size-slider">
            Grid Size: {gridSize}x{gridSize}
          </label>
          <input
            id="grid-size-slider"
            type="range"
            min="8"
            max="24"
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
          </div>
        </div>
      </div>
      <div className="grid-container">
        <Grid
          gridSize={gridSize}
          walls={walls}
          setWalls={setWalls}
          startNodeIndex={startNodeIndex}
          setStartNodeIndex={setStartNodeIndex}
          endNodeIndex={endNodeIndex}
          setEndNodeIndex={setEndNodeIndex}
          path={path}
        />
      </div>
    </div>
  );
}

export default App;
