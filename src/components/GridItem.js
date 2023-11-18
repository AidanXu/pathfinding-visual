import React, { useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";

const GridItem = ({
  index,
  nodeType,
  isWall,
  moveNode,
  toggleWall,
  handleMouseDown,
  handleMouseEnter,
  handleMouseUp,
  hasMouseMoved,
  isPath,
}) => {
  const ref = useRef(null); // Create a ref for the cell

  const [{ isDragging }, drag, preview] = useDrag({
    type: "NODE",
    item: { type: nodeType, index },
    canDrag: () => nodeType === "Start" || nodeType === "End", // Dragging only allowed for Start and End nodes
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    preview: getEmptyImage(), // Set an empty image as the drag preview
  });

  // Set up the drag preview
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  const [, drop] = useDrop({
    accept: "NODE",
    drop: (item) => {
      if (!isWall && item.index !== index) {
        moveNode(index, item.type);
      }
    },
    canDrop: () => !isWall, // Only non-wall cells can accept the drop
  });

  drag(drop(ref)); // Connect both drag and drop to the ref

  let className = "cell";
  if (nodeType === "Start") className += " start-node";
  if (nodeType === "End") className += " end-node";
  if (isWall) className += " wall";
  if (isPath && nodeType !== "Start" && nodeType !== "End") {
    className += " path"; // Draw path only if it's not a start or end node
  }

  return (
    <div
      ref={ref}
      className={className}
      onClick={() => {
        if (!hasMouseMoved && nodeType !== "Start" && nodeType !== "End") {
          toggleWall(index);
        }
      }}
      onMouseDown={() => handleMouseDown(index, nodeType)}
      onMouseEnter={() => handleMouseEnter(index, nodeType)}
      onMouseUp={() => handleMouseUp()}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {nodeType === "Start" && <div className="label">Start</div>}
      {nodeType === "End" && <div className="label">End</div>}
    </div>
  );
};

export default GridItem;
