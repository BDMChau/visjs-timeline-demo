/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { DataSet } from "vis-timeline/dist/vis-timeline-graph2d.min";
import { Timeline as VisTimeline } from "vis-timeline/standalone/esm/vis-timeline-graph2d.js";
import "vis-timeline/dist/vis-timeline-graph2d.min.css";
import "./App.css";
import ReactDOM from "react-dom/client";
import moment from "moment";
import { useDragSelectContext } from "./DragSelectProvider";
import { Tooltip } from "@mui/material";

const min = moment().startOf("year").local().toDate(); // first day of this year
const max = moment(moment().local().format()).toDate();

const width = "100%";
const height = "200px";
var groups = [
  {
    id: 1,
    content: "0",
  },
  {
    id: 12,
    content: "0",
  },
  {
    id: 3,
    content: "0",
  },

  // more groups...
];
let scale = "a";

const Timeline = ({ items = [], isLoading = false }) => {
  let isSelecting = false;
  const { ds } = useDragSelectContext();

  const instanceRef = useRef(null); // use this to use events, methods of timeline
  const containerRef = useRef(null);

  const options = {
    clickToUse: false,
    selectable: true,
    multiselect: true,
    // moment: function (date) {
    //   return moment(date).utcOffset("+07:00");
    // },
    // min: min,
    // max: max,
    width: width,
    height: height,
    autoResize: true,
    // zoomMin: 0,
    // zoomMax: 0,
    showCurrentTime: false,
    horizontalScroll: false,
    verticalScroll: false,
    moveable: true,
    zoomable: true,
    // zoomKey: "ctrlKey",
    showTooltips: true,
    stack: true,
    order: (a, b) => a?.ordinal - b?.ordinal,
    orientation: {
      axis: "top",
      item: "top",
    },
    type: "background", // 'box', 'point', 'range', 'background'
    template: (item, element, _data) => {
      const root = ReactDOM.createRoot(element);
      return root.render(
        <div className="videoItemContent" key={item.id} id={item.id}>
          {/* acacac */}
        </div>
      );
    },
    // zoomMin: 1000 * 10 * 60 * 5,
    // showWeekScale: true,

    format: {
      minorLabels: {
        millisecond: "SSS",
        second: "s",
        minute: "HH:mm",
        hour: "HH:mm",
        weekday: "ddd D",
        day: "ddd D",
        week: "w",
        month: "MMM YYYY",
        year: "YYYY",
      },
      majorLabels: {
        millisecond: "HH:mm:ss",
        second: "D MMMM HH:mm",
        minute: "ddd D MMMM",
        hour: "ddd D MMMM",
        weekday: "MMMM YYYY",
        day: "MMMM YYYY",
        week: "MMMM YYYY",
        month: "YYYY",
        year: "YYYY",
      },
    },
  };

  useEffect(() => {
    if (!ds) return;
    ds.addSelectables(document.querySelectorAll(".myVideoItem"));

    console.log("ds.getSelectables()", ds.getSelectables());

    const dsId = ds.subscribe("Interaction:end", (e) => {
      console.log("callbac", e);
    });

    const update = ds.subscribe("Interaction:update", (e) => {
      const pageX = e?.event?.pageX;
      const ref = containerRef?.current;
      const timeline = document.querySelector(".vis-timeline");
      if (pageX && ref && timeline) {
        isSelecting = true;
        timeline?.click();
      }
    });

    return () => {
      ds.unsubscribe("Interaction:end", null, dsId);
      ds.unsubscribe("Interaction:update", null, update);
    };
  }, [ds]);

  // init time-line
  useEffect(() => {
    if (containerRef?.current) {
      if (instanceRef?.current) {
        instanceRef.current.destroy();
      }

      let dataSet = [];
      if (items?.length) {
        dataSet = new DataSet(items);
      }
      instanceRef.current = new VisTimeline(
        containerRef.current,
        dataSet,
        options
      );
    }
  }, [items]);

  useEffect(() => {
    const ref = instanceRef?.current;
    if (ref) {
      // ref.setWindow(min, max);
      subscribeEvents(ref);
    }
  }, []);

  const subscribeEvents = (ref) => {
    let drag = false;
    let interval = null;
    if (!ref) return;
    ref.on("mouseDown", (props) => {
      console.log("mousedown", props);
    });
    ref.on("mouseUp", (props) => {
      console.log("up", props);
    });

    ref.on("rangechange", (props) => {
      if (props.byUser === true) {
        drag = true;
      }
    });
    ref.on("rangechanged", (props) => {
      console.log(props);

      if (props.byUser === true) {
        setTimeout(() => {
          drag = false;
        }, 0);
      }
    });

    ref.on("click", (props) => {
      console.log("click", props);

      if (isSelecting) {
        return;
      }

      const area = document.querySelector(".ds-selector-area");
      if (area) {
      }

      if (drag) return;

      try {
        ref.getCustomTime("customTime");
        ref.setCustomTime(props.time, "customTime");
      } catch (error) {
        ref.addCustomTime(props.time, "customTime");
      }
      function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
      }

      interval = setInterval(() => {
        try {
          const time = ref.getCustomTime("customTime");
          const random = getRndInteger(200, 300);
          const { start, end } = ref.getWindow();
          // ref.moveTo(time, { animation: false });
          ref.setWindow(
            moment(start).add(random, "millisecond").toDate(),
            moment(end).add(random, "millisecond").toDate(),
            { animation: false }
          );
          ref.setCustomTime(
            moment(time).add(random, "millisecond").toDate(),
            "customTime"
          );
        } catch (err) {}
      }, 100);
    });

    ref.on("mouseMove", (props) => {
      // console.log("mouseMove", props);
    });

    // ref.on("changed", (props) => {
    //   const elements = document.getElementsByClassName("vis-text vis-minor");

    //   let text = "";
    //   for (let i = 0; i < elements.length; i++) {
    //     const e = elements[i];
    //     if (e.className === "vis-text vis-minor vis-measure") continue;

    //     e.style = e.style.cssText + ";display:flex;text-align: center";
    //     text = e.textContent;
    //     // e.textContent = "";

    //     const child = document.createElement("div");
    //     child.className = "minorThing1";
    //     child.style = "display: flex;width:100%;justify-content:space-evenly";
    //     for (let j = 0; j < 1; j++) {
    //       const subChild = document.createElement("div");
    //       subChild.className = "minorThing";

    //       if (j === 4) {
    //         subChild.textContent = text;
    //         subChild.style = "font-size:12px;margin:10px 0 0 0";
    //       } else {
    //         subChild.style =
    //           "width:1px;height:7px;margin-top:17px;background:grey;color:black;visibility:visible";
    //       }

    //       child.appendChild(subChild);
    //     }
    //     e.appendChild(child);
    //     console.log(e);
    //   }
    // });
  };

  const drawCanvas = () => {
    console.log("a");
    var canvas = document.getElementById("canvas");
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    var ctx = canvas.getContext("2d");

    // style the context
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 1;
    ctx.fillStyle = "#0000ff3d";

    var $canvas = document.getElementById("canvas");
    var canvasOffset = $canvas.getBoundingClientRect();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;
    // var scrollX = $canvas.scrollLeft();
    // var scrollY = $canvas.scrollTop();

    var isDown = false;

    var startX;
    var startY;

    var prevStartX = 0;
    var prevStartY = 0;

    var prevWidth = 0;
    var prevHeight = 0;

    function handleMouseDown(e) {
      e.preventDefault();
      e.stopPropagation();

      // save the starting x/y of the rectangle
      startX = parseInt(e.clientX - offsetX);
      startY = parseInt(e.clientY - offsetY);

      // set a flag indicating the drag has begun
      isDown = true;
    }

    function handleMouseUp(e) {
      e.preventDefault();
      e.stopPropagation();

      // the drag is over, clear the dragging flag
      isDown = false;
    }

    function handleMouseOut(e) {
      e.preventDefault();
      e.stopPropagation();

      // the drag is over, clear the dragging flag
      isDown = false;
    }

    function handleMouseMove(e) {
      e.preventDefault();
      e.stopPropagation();

      // if we're not dragging, just return
      if (!isDown) {
        return;
      }

      // get the current mouse position
      let mouseX = parseInt(e.clientX - offsetX);
      let mouseY = parseInt(e.clientY - offsetY);

      // Put your mousemove stuff here

      // calculate the rectangle width/height based
      // on starting vs current mouse position
      var width = mouseX - startX;
      var height = mouseY - startY;

      // clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // draw a new rect from the start position
      // to the current mouse position
      ctx.strokeRect(startX, startY, width, height);
      ctx.fillRect(startX, startY, width, height);

      prevStartX = startX;
      prevStartY = startY;

      prevWidth = width;
      prevHeight = height;
    }

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mousemove", handleMouseMove);
  };

  const drawTooltip = (props) => {
    var x = props.pageX;
    var y = props.pageY;

    const chau = document.getElementById("chau");
    const chau2 = document.getElementById("chau2");

    if (chau2) {
      chau2.style.left = x - 180 + "px";
      chau2.textContent = props.time;
    }

    if (chau) {
      chau.style.left = x + "px";
      chau.style.position = "absolute";
      // chau.style.pointerEvents = "none";
    } else {
      var newthing = document.createElement("div");

      document.getElementsByClassName("vis-timeline")[0].appendChild(newthing);

      // newthing.style.pointerEvents = "none";
      newthing.style.position = "absolute";
      newthing.style.width = "2px";
      newthing.style.height = "100%";
      newthing.style.background = "blue";
      newthing.id = "chau";
      newthing.style.left = x + "px";

      const newthing2 = document.createElement("div");

      document.getElementsByClassName("timeline")[0].appendChild(newthing2);

      // newthing.style.pointerEvents = "none";

      newthing2.id = "chau2";
      newthing2.textContent = props.time;
      const style2 = {
        position: "absolute",
        width: "auto",
        height: "auto",
        background: "grey",
        top: "-32px",
        padding: "5px",
      };
      Object.assign(newthing2.style, style2);
      newthing2.style.left = x - 50 + "px";
    }
  };

  return (
    <div
      className="timeline-main"
      style={{
        width: "95%",
        margin: "auto",
        // background: "grey",
        padding: "10px",
        zIndex: "9999999999",
      }}
    >
      {/* <canvas
        style={{
          background: "#80808073",
          position: "absolute",
          zIndex: "99",
        }}
        id="canvas"
      ></canvas> */}
      <div
        onMouseLeave={(e) => {
          const chau = document.getElementById("chau");
          const chau2 = document.getElementById("chau2");
          chau?.remove();
          chau2?.remove();
        }}
        className="timeline"
        id="timeline"
        ref={containerRef}
      />
    </div>
  );
};

export default Timeline;
