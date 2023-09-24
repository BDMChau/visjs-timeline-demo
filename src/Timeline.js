import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import VisTimeline from "react-visjs-timeline";
import { moment } from "vis";
import ReactDOM from "react-dom/client";
import SelectableItem from "./SelectableItem";
import MouseSelection from "./MouseSelection";
import { createSelectable } from "react-selectable-fast";
import { boxesIntersect } from "react-drag-to-select";

const Timeline = ({ items }) => {
  const [selectionBox, setSelectionBox] = useState();
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const selectableItems = useRef([]);

  const timelineRef = useRef(null);

  const clickHandler = (props) => {
    // timelineRef.current.$el.focus(1);
    console.log("clickHandler", props);
  };
  const currentTimeTickHandler = (props) => {
    // console.log("currentTimeTickHandler", props);
  };

  const rangeChangeHandler = (props) => {
    // console.log("rangeChangeHandler", props);
  };

  const contextmenuHandler = (props) => {
    // props.event.preventDefault();
    console.log("contextmenuHandler", props);
  };

  const dragoverHandler = (props) => {
    console.log("dragoverHandler", props);
  };
  const dropHandler = (props) => {
    console.log("drop", props);
  };
  const itemoverHandler = (props) => {
    console.log("itemoverHandler", props);
  };
  const timechangeHandler = (props) => {
    console.log("timechangeHandler", props);
  };
  const mouseOverHandler = (props) => {
    // console.log("mouseOverHandler", props);
  };
  const mouseDownHandler = (props) => {
    console.log("mouseDownHandler", props);
  };
  const mouseUpHandler = (props) => {
    console.log("mouseUpHandler", props);
  };
  const mouseMoveHandler = (props) => {
    // console.log("mouseMoveHandler", props);
  };

  const options = {
    // moment: function (date) {
    //   return moment(date).utcOffset("+07:00");
    // },
    min: new Date(2023, 8, 22),
    max: new Date(2023, 8, 30),
    width: "100%",
    height: "200px",
    autoResize: true,
    zoomable: true,
    // zoomMin: 1000 * 60 * 60 * 24 * 31,             // one day in milliseconds
    // zoomMax: 1000 * 60 * 60 * 24 * 31 * 3,
    showCurrentTime: true,
    verticalScroll: true,
    // editable: {
    //   add: true, // add new items by double tapping
    //   updateTime: true, // drag items horizontally
    //   updateGroup: true, // drag items from one group to another
    //   remove: true, // delete an item by tapping the delete button top right
    //   overrideItems: false, // allow these options to override item.editable
    // },
    // end: new Date(),
    showTooltips: true,
    stack: true, // override item each other
    // snap: function to define ratio moving items
    template: (item, element, data) => {
      selectableItems.current.push({ el: element, id: item.id });
      const root = ReactDOM.createRoot(element);
      return root.render(
        <SelectableItem
          item={item}
          selected={selectedIndexes.includes(item.id)}
        />
      );
    },
    // timeAxis: { scale: "second", step: 1 },
    type: "range", // 'box', 'point', 'range', and 'background'
  };

  const handleSelectionChange = useCallback(
    (box) => {
      setSelectionBox(box);
      const indexesToSelect = [];
      selectableItems.current.forEach((item, index) => {
        const { left, top, width, height } = item?.el?.getBoundingClientRect();

        if (boxesIntersect(box, { left, top, width, height })) {
          console.log("item:===", item);
          indexesToSelect.push(item.id);
        }
      });
      setSelectedIndexes(indexesToSelect);
    },
    [selectableItems]
  );

  return (
    <div>
      <MouseSelection onSelectionChange={handleSelectionChange} />

      <div className="timeline">
        <VisTimeline
          ref={timelineRef}
          items={items}
          options={options}
          // methods

          //events
          // currentTimeTickHandler={currentTimeTickHandler}
          clickHandler={clickHandler}
          rangechangeHandler={rangeChangeHandler}
          contextmenuHandler={contextmenuHandler}
          dragoverHandler={dragoverHandler}
          dropHandler={dropHandler}
          itemoverHandler={itemoverHandler}
          timechangeHandler={timechangeHandler}
          mouseOverHandler={mouseOverHandler}
          mouseDownHandler={mouseDownHandler}
          mouseUpHandler={mouseUpHandler}
          mouseMoveHandler={mouseMoveHandler}
        />
      </div>
    </div>
  );
};

export default Timeline;
