// src/components/mazeGenerator.js
const generateStaticMaze = (size) => {
  // Initialize the grid
  const grid = initializeGrid(size);

  // Apply a fixed pattern of walls and paths
  applyStaticPattern(grid);

  return grid;
};

const initializeGrid = (size) => {
  // Initialize the grid with all paths
  const grid = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => "path")
  );
  return grid;
};

const applyStaticPattern = (grid) => {
  // Apply a fixed pattern
  for (let i = 0; i < grid.length; i += 2) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = "wall";
    }
  }
  // More pattern logic here...
};

export { generateStaticMaze };
