function chooseOrientation(width, height) {
  if (width < height) {
    return "HORIZONTAL";
  } else if (height < width) {
    return "VERTICAL";
  } else {
    return Math.random() > 0.5 ? "HORIZONTAL" : "VERTICAL";
  }
}

function divide(
  grid,
  gridSize,
  startX,
  startY,
  width,
  height,
  orientation,
  startNodeIndex,
  endNodeIndex
) {
  if (width < 2 || height < 2) {
    return;
  }

  let horizontal = orientation === "HORIZONTAL";

  // Wall starting position
  let wx = startX + (horizontal ? 0 : Math.floor(Math.random() * (width - 2)));
  let wy = startY + (horizontal ? Math.floor(Math.random() * (height - 2)) : 0);

  // Passage position
  let px = wx + (horizontal ? Math.floor(Math.random() * width) : 0);
  let py = wy + (horizontal ? 0 : Math.floor(Math.random() * height));

  let dx = horizontal ? 1 : 0;
  let dy = horizontal ? 0 : 1;

  let length = horizontal ? width : height;

  for (let i = 0; i < length; i++) {
    let index = wy * gridSize + wx;
    if (
      index !== startNodeIndex &&
      index !== endNodeIndex &&
      (wx !== px || wy !== py)
    ) {
      grid[index] = true;
    }
    wx += dx;
    wy += dy;
  }

  // Recursive division
  let [nx, ny, w, h] = horizontal
    ? [startX, startY, width, wy - startY + 1]
    : [startX, startY, wx - startX + 1, height];
  divide(
    grid,
    gridSize,
    nx,
    ny,
    w,
    h,
    chooseOrientation(w, h),
    startNodeIndex,
    endNodeIndex
  );

  [nx, ny, w, h] = horizontal
    ? [startX, wy + 1, width, startY + height - wy - 1]
    : [wx + 1, startY, startX + width - wx - 1, height];
  divide(
    grid,
    gridSize,
    nx,
    ny,
    w,
    h,
    chooseOrientation(w, h),
    startNodeIndex,
    endNodeIndex
  );
}

export function recursiveDivisionMaze(gridSize, startNodeIndex, endNodeIndex) {
  let grid = new Array(gridSize * gridSize).fill(false);
  divide(
    grid,
    gridSize,
    0,
    0,
    gridSize,
    gridSize,
    chooseOrientation(gridSize, gridSize),
    startNodeIndex,
    endNodeIndex
  );
  return grid;
}
