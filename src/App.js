import React from "react";
import "./App.css";
import { DragSelectProvider } from "./DragSelectProvider";
import TimeLine from "./Timeline";

const items = [
  {
    id: 1111155,
    start: "2023-09-23 15:05",
    end: "2023-09-23 16:00",
    content: "Video A",
    className: "myVideoItem",
  },
  {
    id: 2,
    start: "2023-09-23 16:10",
    end: "2023-09-23 17:00",
    content: "Video B",
    className: "myVideoItem",
    editable: false,
  },
  // {
  //   start: "2023-09-23 15:30",
  //   end: "2023-09-23 17:00",
  //   content: "Video C",
  // },
];

function App() {
  const selectionFinish = (props) => {
    console.log("selectionFinish", props);
  };

  return (
    <div className="App">
      <DragSelectProvider
        settings={{
          // area: document.querySelector("#timeline"),
          autoScrollSpeed: 5,
          overflowTolerance: { x: 25, y: 25 },
          selectorClass: "my-ds-selector",
        }}
      >
        <TimeLine items={items} />
      </DragSelectProvider>
    </div>
  );
}

export default App;
