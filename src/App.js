import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Grid from "./components/Grid";
import Sidebar from "./components/Sidebar";
import { aStar } from "./components/AStarSearch";
import greedyBestFirstSearch from "./components/GreedySearch";
import { bfs } from "./components/bfs";
import { dfs } from "./components/dfs";
import { recursiveDivisionMaze } from "./components/recursiveDivision";
import "./App.css";

function App() {
  // Convert gridSize into a state variable
  const [gridSize, setGridSize] = useState(12); // Default grid size is 12x12

  const [walls, setWalls] = useState(
    new Array(gridSize * gridSize).fill(false)
  );
  const [startNodeIndex, setStartNodeIndex] = useState(0);
  const [endNodeIndex, setEndNodeIndex] = useState(gridSize * gridSize - 1);

  const [selectedAlgorithm, setSelectedAlgorithm] = useState("A* Search");

  // Algorithms list
  const algorithms = ["A* Search", "Greedy Best-first Search", "BFS", "DFS"];

  const [path, setPath] = useState([]);

  const resetPath = () => {
    setPath([]);
  };

  const drawPath = (foundPath) => {
    // Assuming foundPath is an array of indices representing the path
    setPath(foundPath);
  };

  // Function to call pathfinding algorithm
  const findPath = () => {
    let path = null;
    switch (selectedAlgorithm) {
      case "A* Search":
        path = aStar(startNodeIndex, endNodeIndex, walls, gridSize);
        break;
      case "Greedy Best-first Search":
        path = greedyBestFirstSearch(
          startNodeIndex,
          endNodeIndex,
          walls,
          gridSize
        );
        break;
      case "BFS":
        path = bfs(startNodeIndex, endNodeIndex, walls, gridSize);
        break;
      case "DFS":
        path = dfs(startNodeIndex, endNodeIndex, walls, gridSize);
        break;
      default:
        break;
    }

    if (path) {
      drawPath(path);
    } else {
      console.log("No path found");
    }
  };

  // Function to generate a maze using recursive division
  const handleGenerateMaze = () => {
    const newWalls = recursiveDivisionMaze(
      gridSize,
      startNodeIndex,
      endNodeIndex
    );
    setWalls(newWalls);
  };

  return (
    <div className="App">
      <Navbar />
      <div className="flex-container">
        <div className="sidebar-wrapper">
          <Sidebar
            gridSize={gridSize}
            setGridSize={setGridSize}
            selectedAlgorithm={selectedAlgorithm}
            setSelectedAlgorithm={setSelectedAlgorithm}
            algorithms={algorithms}
            findPath={findPath}
            handleGenerateMaze={handleGenerateMaze}
          />
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
            resetPath={resetPath}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
