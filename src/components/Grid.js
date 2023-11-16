import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GridItem from "./GridItem";
import "./Grid.css";

const Grid = ({ gridSize }) => {
  useEffect(() => {
    function updateSize() {
      // Get viewport dimensions
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );

      // Navbar and padding
      const navbarHeight = 50; // Height of the navbar
      const padding = 10; // Padding around the grid

      // Calculate the available height and width for the grid
      const availableHeight = vh - navbarHeight - padding * 2;
      const availableWidth = vw - padding * 2;

      // Calculate the size for the cells, considering the grid should be square
      const gridSizeValue = Math.min(availableWidth, availableHeight);
      const cellSize = gridSizeValue / gridSize;

      // Set the CSS variable for the cell size
      document.documentElement.style.setProperty(
        "--cell-size",
        `${cellSize}px`
      );
      // Set the CSS variable for the cell size
      document.documentElement.style.setProperty(
        "--cell-size",
        `${cellSize}px`
      );
      document.documentElement.style.setProperty("--n", gridSize); // Set the number of grid items per row/column
    }

    // Add event listener to resize the grid when the window resizes
    window.addEventListener("resize", updateSize);
    // Set the initial size
    updateSize();

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", updateSize);
  }, [gridSize]);

  const [walls, setWalls] = useState(
    new Array(gridSize * gridSize).fill(false)
  );
  // Define the default positions for start and end nodes
  const [startNodeIndex, setStartNodeIndex] = useState(0);
  const [endNodeIndex, setEndNodeIndex] = useState(gridSize * gridSize - 1);

  // Function to move the start or end node
  const moveNode = (newIndex, nodeType) => {
    if (nodeType === "start") {
      setStartNodeIndex(newIndex);
    } else if (nodeType === "end") {
      setEndNodeIndex(newIndex);
    }
  };

  // Function to toggle a cell's "wall" state
  const toggleWall = (index) => {
    if (index !== startNodeIndex && index !== endNodeIndex) {
      const newWalls = [...walls];
      newWalls[index] = !newWalls[index];
      setWalls(newWalls);
    }
  };

  // Map over the cells to create GridItem components
  const cells = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const isStartNode = index === startNodeIndex;
    const isEndNode = index === endNodeIndex;
    const isWall = walls[index];

    // Determine the nodeType for each cell
    let nodeType = null;
    if (isStartNode) nodeType = "start";
    if (isEndNode) nodeType = "end";

    return (
      <GridItem
        key={index}
        index={index}
        nodeType={nodeType}
        isWall={isWall}
        moveNode={moveNode}
        toggleWall={toggleWall}
      />
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid">{cells}</div>
    </DndProvider>
  );
};

export default Grid;
