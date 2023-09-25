import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import VisTimeline from "react-visjs-timeline";
import { moment } from "vis";
import ReactDOM from "react-dom/client";
import DragSelect from "dragselect";
import { useDragSelectContext } from "./DragSelectProvider";
import { isEmpty } from "lodash";

const Timeline = ({ items }) => {
  const { ds, setDS } = useDragSelectContext();
  const [selectedIds, setSelectedIds] = useState([]);
  const timelineRef = useRef(null);

  const clickHandler = (props) => {
    // timelineRef.current.$el.focus(1);
    // console.log("clickHandler", props);
    // resetDragSelect();
  };
  const selectHandler = (props) => {
    // timelineRef.current.$el.focus(1);
    // console.log("selectHandler", props);
  };

  const rangeChangeHandler = (props) => {
    // console.log("rangeChangeHandler", props);
  };

  const contextmenuHandler = (props) => {
    // props.event.preventDefault();
    console.log("contextmenuHandler", props);
  };

  const itemoverHandler = (props) => {
    // console.log("itemoverHandler", props);
  };
  const timechangeHandler = (props) => {
    // console.log("timechangeHandler", props);
  };
  const mouseOverHandler = (props) => {
    // console.log("mouseOverHandler", props);
  };
  // const mouseDownHandler = (props) => {
  //   props.event.stopPropagation();
  //   console.log("mouseDownHandler", props);
  // };
  // const mouseUpHandler = (props) => {
  //   props.event.stopPropagation();

  //   console.log("mouseUpHandler", props);
  // };
  const mouseMoveHandler = (props) => {
    // console.log("mouseMoveHandler", props);
  };

  const options = {
    selectable: true,
    multiselect: true,
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
      const root = ReactDOM.createRoot(element);
      return root.render(
        <div
          className="myItem"
          key={item.id}
          id={item.id}
          // style={{
          //   background: selectedIds.includes(item.id.toString())
          //     ? "green"
          //     : "unset",
          // }}
        >
          {item.content}
        </div>
      );
    },
    // timeAxis: { scale: "second", step: 1 },
    type: "range", // 'box', 'point', 'range', and 'background'
  };

  useEffect(() => {
    // timelineRef.current.$el.moveTo(new Date());
    // timelineRef.current.$el.on("mouseUp", (props) => {
    //   // console.log("mouse mouseUp", props);
    // });
  }, []);

  useEffect(() => {
    if (!ds) return;
    ds.addSelectables(document.querySelectorAll(".myVideoItem"));

    const dsId = ds.subscribe("callback", (e) => {
      console.log("callbac", e.items);
      // ds.clearSelection();

      const _selectedIds = [];
      e.items.forEach((item) => {
        const id =
          item?.childNodes?.[0]?.childNodes?.[0]?.childNodes?.[0]?.id || "";
        id && _selectedIds.push(id);

        ds?.addSelection(item);
      });

      // setSelectedIds(_selectedIds);
    });
    console.log(ds);

    return () => {
      ds.unsubscribe("callback", null, dsId);
    };
  }, [ds]);

  return (
    <div
      className="timeline"
      id="timeline"
      onDoubleClick={() => {}}
      onMouseDown={() => {
        console.log("aaa");
      }}
    >
      {!isEmpty(ds) && (
        <VisTimeline
          ref={timelineRef}
          items={items}
          options={options}
          // methods

          //events
          // currentTimeTickHandler={currentTimeTickHandler}
          clickHandler={clickHandler}
          selectHandler={selectHandler}
          rangechangeHandler={rangeChangeHandler}
          contextmenuHandler={contextmenuHandler}
          itemoverHandler={itemoverHandler}
          timechangeHandler={timechangeHandler}
          mouseOverHandler={mouseOverHandler}
          // mouseDownHandler={mouseDownHandler}
          // mouseUpHandler={mouseUpHandler}
          mouseMoveHandler={mouseMoveHandler}
        />
      )}
    </div>
  );
};

export default Timeline;
