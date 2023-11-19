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

// The Greedy Best-First Search algorithm
export default function greedyBestFirstSearch(
  startIndex,
  endIndex,
  walls,
  gridSize
) {
  let openSet = new Set([startIndex]);
  let cameFrom = new Map();
  let gScore = new Map([[startIndex, 0]]);
  let fScore = new Map([
    [
      startIndex,
      manhattanDistance(
        indexToPosition(startIndex, gridSize),
        indexToPosition(endIndex, gridSize)
      ),
    ],
  ]);

  while (openSet.size > 0) {
    let current = null;
    let lowestFScore = Infinity;

    openSet.forEach((nodeIndex) => {
      let score = fScore.get(nodeIndex);
      if (score < lowestFScore) {
        lowestFScore = score;
        current = nodeIndex;
      }
    });

    if (current === endIndex) {
      let path = [];
      while (current !== startIndex) {
        path.push(current);
        current = cameFrom.get(current);
      }
      path.push(startIndex);
      return path.reverse();
    }

    openSet.delete(current);

    getNeighbors(current, gridSize, walls).forEach((neighbor) => {
      if (neighbor === endIndex || !walls[neighbor]) {
        if (!cameFrom.has(neighbor)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, gScore.get(current) + 1);
          fScore.set(
            neighbor,
            manhattanDistance(
              indexToPosition(neighbor, gridSize),
              indexToPosition(endIndex, gridSize)
            )
          );
          openSet.add(neighbor);
        }
      }
    });
  }

  return []; // No path found
}
