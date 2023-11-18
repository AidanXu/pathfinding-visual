import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import GridItem from "./GridItem";
import CustomDragLayer from "./CustomDragLayer";
import "./Grid.css";

const Grid = ({
  gridSize,
  walls,
  setWalls,
  startNodeIndex,
  setStartNodeIndex,
  endNodeIndex,
  setEndNodeIndex,
  path,
}) => {
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

      // Calculate the size for icons and labels based on cell size
      const iconSize = Math.max(cellSize * 0.3, 12); // Ensure icons have a minimum size
      const labelFontSize = Math.max(cellSize * 0.15, 12); // Ensure labels have a minimum size

      // Set the CSS variables for the cell size, icon size, and label font size
      document.documentElement.style.setProperty(
        "--cell-size",
        `${cellSize}px`
      );
      document.documentElement.style.setProperty(
        "--icon-size",
        `${iconSize}px`
      );
      document.documentElement.style.setProperty(
        "--label-font-size",
        `${labelFontSize}px`
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

  // Update the start and end node positions when gridSize changes
  useEffect(() => {
    setStartNodeIndex(0); // Reset start node to top left corner
    setEndNodeIndex(gridSize * gridSize - 1); // Set end node to bottom right corner
    setWalls(new Array(gridSize * gridSize).fill(false)); // Reset walls for new grid size
  }, [gridSize]);

  // Function to move the start or end node
  const moveNode = (newIndex, nodeType) => {
    if (nodeType === "Start") {
      setStartNodeIndex(newIndex);
    } else if (nodeType === "End") {
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

  const [isDragging, setIsDragging] = useState(false); // New state to track dragging

  const [hasMouseMoved, setHasMouseMoved] = useState(false);

  const handleMouseDown = (index, nodeType) => {
    if (nodeType !== "Start" && nodeType !== "End") {
      setIsDragging(true);
      setHasMouseMoved(false);
    }
  };

  const handleMouseEnter = (index, nodeType) => {
    if (isDragging && nodeType !== "Start" && nodeType !== "End") {
      setHasMouseMoved(true);
      toggleWall(index);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Map over the cells to create GridItem components
  const cells = Array.from({ length: gridSize * gridSize }, (_, index) => {
    const isStartNode = index === startNodeIndex;
    const isEndNode = index === endNodeIndex;
    const isWall = walls[index];

    // Determine the nodeType for each cell
    let nodeType = null;
    if (isStartNode) nodeType = "Start";
    if (isEndNode) nodeType = "End";

    return (
      <GridItem
        key={index}
        index={index}
        nodeType={nodeType}
        isWall={isWall}
        moveNode={moveNode}
        toggleWall={toggleWall}
        handleMouseDown={handleMouseDown}
        handleMouseEnter={handleMouseEnter}
        handleMouseUp={handleMouseUp}
        hasMouseMoved={hasMouseMoved}
        isPath={path.includes(index)}
      />
    );
  });

  return (
    <DndProvider backend={HTML5Backend}>
      <CustomDragLayer />
      <div className="grid" onMouseUp={handleMouseUp}>
        {cells}
      </div>
    </DndProvider>
  );
};

export default Grid;
