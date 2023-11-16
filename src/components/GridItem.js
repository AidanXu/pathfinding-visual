import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const GridItem = ({ index, nodeType, isWall, moveNode, toggleWall }) => {
  const ref = useRef(null); // Create a ref for the cell

  const [, drag] = useDrag({
    type: "NODE",
    item: { type: nodeType, index },
    canDrag: () => nodeType === "start" || nodeType === "end", // Only start/end nodes are draggable
  });

  const [, drop] = useDrop({
    accept: "NODE",
    drop: (item) => {
      if (!isWall && item.index !== index) {
        moveNode(index, item.type);
      }
    },
    canDrop: () => !isWall, // Only non-wall cells can accept the drop
  });

  // Conditionally apply the drag and drop refs
  if (nodeType === "start" || nodeType === "end") {
    drag(ref);
  } else if (!isWall) {
    drop(ref);
  }

  let className = "cell";
  if (nodeType === "start") className += " start-node";
  if (nodeType === "end") className += " end-node";
  if (isWall) className += " wall";

  return (
    <div ref={ref} className={className} onClick={() => toggleWall(index)}>
      {nodeType === "start" && <div className="label">Start</div>}
      {nodeType === "end" && <div className="label">End</div>}
      {/* Additional content can be added here if needed */}
    </div>
  );
};

export default GridItem;
