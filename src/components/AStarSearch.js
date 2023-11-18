// AStarSearch.js
function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

function indexToCoord(index, gridSize) {
  return { x: index % gridSize, y: Math.floor(index / gridSize) };
}

function coordToIndex(x, y, gridSize) {
  return y * gridSize + x;
}

function isWall(nodeIndex, walls) {
  return walls[nodeIndex];
}

export function aStar(startIndex, endIndex, walls, gridSize) {
  const start = indexToCoord(startIndex, gridSize);
  const end = indexToCoord(endIndex, gridSize);

  const openSet = new Set([startIndex]);
  const cameFrom = new Map();

  const gScore = new Map();
  gScore.set(startIndex, 0);

  const fScore = new Map();
  fScore.set(startIndex, heuristic(start, end));

  while (openSet.size > 0) {
    let current = Array.from(openSet).reduce((lowest, node) => {
      if (!lowest || fScore.get(node) < fScore.get(lowest)) {
        return node;
      }
      return lowest;
    }, null);

    if (current === endIndex) {
      // Path has been found
      const path = [];
      while (current !== startIndex) {
        path.push(current);
        current = cameFrom.get(current);
      }
      path.push(startIndex);
      return path.reverse();
    }

    openSet.delete(current);

    const currentCoord = indexToCoord(current, gridSize);
    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (Math.abs(x) === Math.abs(y)) continue;

        const neighborCoord = { x: currentCoord.x + x, y: currentCoord.y + y };
        const neighborIndex = coordToIndex(
          neighborCoord.x,
          neighborCoord.y,
          gridSize
        );

        if (
          neighborCoord.x < 0 ||
          neighborCoord.x >= gridSize ||
          neighborCoord.y < 0 ||
          neighborCoord.y >= gridSize
        )
          continue; // Skip if out of bounds
        if (isWall(neighborIndex, walls)) continue; // Skip walls

        const tentativeGScore = gScore.get(current) + 1; // 1 is the distance to a neighbor

        if (tentativeGScore < (gScore.get(neighborIndex) || Infinity)) {
          // This path to neighbor is better than any previous one
          cameFrom.set(neighborIndex, current);
          gScore.set(neighborIndex, tentativeGScore);
          fScore.set(
            neighborIndex,
            tentativeGScore + heuristic(neighborCoord, end)
          );

          if (!openSet.has(neighborIndex)) {
            openSet.add(neighborIndex);
          }
        }
      }
    }
  }

  // No path was found
  return null;
}
