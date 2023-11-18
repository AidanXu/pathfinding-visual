import React from "react";
import { useDragLayer } from "react-dnd";

const CustomDragLayer = () => {
  const { itemType, isDragging, item, currentOffset } = useDragLayer(
    (monitor) => ({
      itemType: monitor.getItemType(),
      item: monitor.getItem(), // Get the item being dragged
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    })
  );

  if (!isDragging || !currentOffset) {
    return null;
  }

  // Styles to position the drag preview directly under the cursor
  const layerStyles = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: currentOffset.x,
    top: currentOffset.y,
    transform: "translate(-50%, -50%)", // Center the preview on the cursor
  };

  const renderItem = () => {
    switch (itemType) {
      case "NODE":
        const symbol = item.type === "Start" ? "➤" : "⬤";
        return (
          <div style={{ fontSize: "2em", color: "#0CA6FE" }}>{symbol}</div>
        );
      default:
        return null;
    }
  };

  return <div style={layerStyles}>{renderItem()}</div>;
};

export default CustomDragLayer;
