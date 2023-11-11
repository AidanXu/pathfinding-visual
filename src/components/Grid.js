import React, { useState, useEffect, useRef } from "react";
import "./Grid.css"; // Make sure the path to your CSS file is correct

const Grid = () => {
  // Define the state to hold the grid size
  const [gridSize, setGridSize] = useState({ width: 0, height: 0 });
  const gridRef = useRef(null);
  const N = 10; // Set N to whatever size you need

  // Assuming a grid size, e.g., 10x10
  const gridRows = 10;
  const gridCols = 10;

  useEffect(() => {
    // This function is for handling resize events
    const handleResize = () => {
      if (gridRef.current) {
        setGridSize({
          width: gridRef.current.offsetWidth,
          height: gridRef.current.offsetHeight,
        });
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the resize function to set initial size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="grid">
      {Array.from({ length: N }, (_, rowIndex) => (
        <div key={rowIndex} className="row">
          {Array.from({ length: N }, (_, colIndex) => (
            <div
              key={colIndex}
              className="node"
              // Add any additional logic or styling here
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
