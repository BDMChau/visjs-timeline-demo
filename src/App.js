import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import Selectable from "./Selectable";
// import SelectableWrapper from "./SelectableWrapper";
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
    // editable: true,
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
      {/* <Selectable selectionFinish={selectionFinish}> */}
      {/* <SelectableWrapper> */}
      <TimeLine items={items} />
      {/* </SelectableWrapper> */}
      {/* </Selectable> */}
    </div>
  );
}

export default App;
