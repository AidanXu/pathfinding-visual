export function bfs(startIndex, endIndex, walls, gridSize) {
  const queue = [startIndex];
  const visited = new Set();
  const cameFrom = new Map();

  while (queue.length > 0) {
    const currentNode = queue.shift();
    visited.add(currentNode);

    if (currentNode === endIndex) {
      const path = [];
      let currentNode = endIndex;
      while (currentNode !== startIndex) {
        path.unshift(currentNode);
        currentNode = cameFrom.get(currentNode);
      }
      path.unshift(startIndex);
      return path;
    }

    const neighbors = getNeighbors(currentNode, gridSize, walls);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        cameFrom.set(neighbor, currentNode);
      }
    }
  }

  return []; // No path found
}

// Heuristic function for Greedy Best-First Search
function manhattanDistance(pos0, pos1) {
  return Math.abs(pos1.x - pos0.x) + Math.abs(pos1.y - pos0.y);
}

// Converts index to x, y coordinates
function indexToPosition(index, gridSize) {
  return { x: index % gridSize, y: Math.floor(index / gridSize) };
}

// Converts x, y coordinates to index
function positionToIndex(pos, gridSize) {
  return pos.y * gridSize + pos.x;
}

// Checks if the position is within the grid boundaries
function isInsideGrid(pos, gridSize) {
  return pos.x >= 0 && pos.x < gridSize && pos.y >= 0 && pos.y < gridSize;
}

// Get all valid neighbors for the current node
function getNeighbors(nodeIndex, gridSize, walls) {
  let neighbors = [];
  const { x, y } = indexToPosition(nodeIndex, gridSize);

  [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ].forEach(([dx, dy]) => {
    const newPos = { x: x + dx, y: y + dy };
    if (
      isInsideGrid(newPos, gridSize) &&
      !walls[positionToIndex(newPos, gridSize)]
    ) {
      neighbors.push(positionToIndex(newPos, gridSize));
    }
  });

  return neighbors;
}
