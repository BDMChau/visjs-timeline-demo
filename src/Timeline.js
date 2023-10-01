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

    const dsId = ds.subscribe("callback", (e) => {
      console.log("callbac", e.items);
      // ds.clearSelection();

      // setSelectedIds(_selectedIds);
    });

    return () => {
      ds.unsubscribe("callback", null, dsId);
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
    if (!ref) return;

    ref.on("mouseMove", (props) => {
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

        document
          .getElementsByClassName("vis-timeline")[0]
          .appendChild(newthing);

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
    });
    ref.on("mouseDown", (props) => {});
    ref.on("mouseUp", (props) => {});

    ref.on("click", (props) => {
      ref.setOptions({
        showCurrentTime: true,
      });
      ref.setCurrentTime(props.time);
    });

    ref.on("rangechange", (props) => {
      console.log("rangechange");
    });

    // ref.on("changed", (props) => {
    //   const elements = document.getElementsByClassName("vis-text vis-minor");

    //   let text = "";
    //   for (let i = 0; i < elements.length; i++) {
    //     const e = elements[i];
    //     if (e.className === "vis-text vis-minor vis-measure") continue;

    //     e.style = e.style.cssText + ";display:flex;text-align: center";
    //     text = e.textContent;
    //     e.textContent = "";

    //     const child = document.createElement("div");
    //     child.className = "hello";
    //     child.style = "display: flex;width:100%;justify-content:space-evenly";
    //     for (let j = 0; j < 9; j++) {
    //       const subChild = document.createElement("div");

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

  return (
    <div>
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
