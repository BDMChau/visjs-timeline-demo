import React from "react";
import { useSelectionContainer } from "react-drag-to-select";

const MouseSelection = ({ onSelectionChange }) => {
  const { DragSelection } = useSelectionContainer({
    eventsElement: document.getElementById("root"),
    onSelectionChange,
    onSelectionStart: () => {
      console.log("OnSelectionStart");
    },
    onSelectionEnd: () => console.log("OnSelectionEnd"),
    selectionProps: {
      style: {
        border: "1px dashed purple",
        borderRadius: 4,
        backgroundColor: "transparent",
        opacity: 0.5,
      },
    },
  });

  return <DragSelection />;
};

export default React.memo(MouseSelection);
