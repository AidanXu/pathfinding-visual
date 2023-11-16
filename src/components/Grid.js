// src/components/Grid.js
import React, { useEffect, useState } from "react";
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

  // Initialize a state array to track the "wall" cells
  const [walls, setWalls] = useState(
    new Array(gridSize * gridSize).fill(false)
  );

  // Function to toggle a cell's "wall" state
  const toggleWall = (index) => {
    const newWalls = [...walls];
    newWalls[index] = !newWalls[index];
    setWalls(newWalls);
  };

  // Generate the grid cells
  const cells = Array.from({ length: gridSize * gridSize });

  return (
    <div className="grid">
      {cells.map((_, index) => (
        <div
          key={index}
          className={`cell ${walls[index] ? "wall" : ""}`} // Apply 'wall' class if cell is a wall
          onClick={() => toggleWall(index)} // Toggle wall state on click
        />
      ))}
    </div>
  );
};

export default Grid;
