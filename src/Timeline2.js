import Timeline, { CursorMarker, TodayMarker } from "react-calendar-timeline";
// make sure you include the timeline stylesheet or the timeline will not be styled
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { useEffect, useRef } from "react";
import "./App.css";
const groups = [
  { id: 1, title: "group 1" },
  { id: 2, title: "group 2" },
];

const items = [
  {
    id: 1,
    group: 1,
    title: "item 1",
    start_time: moment(),
    end_time: moment().add(1, "hour"),
  },
  {
    id: 2,
    group: 2,
    title: "item 2",
    start_time: moment().add(-0.5, "hour"),
    end_time: moment().add(0.5, "hour"),
  },
  {
    id: 3,
    group: 1,
    title: "item 3",
    start_time: moment().add(2, "hour"),
    end_time: moment().add(3, "hour"),
  },
];
const minTime = moment().startOf("year").local().toDate().valueOf();
const maxTime = moment(moment().local().format()).toDate().valueOf();

const Timeline2 = () => {
  const ref = useRef(null);

  useEffect(() => {
    console.log(ref);
  });

  return (
    <div>
      Rendered by react!
      <Timeline
        ref={ref}
        groups={groups}
        items={items}
        minZoom={60 * 1000}
        defaultTimeStart={moment().startOf("year").local().toDate()}
        defaultTimeEnd={moment(moment().local().format()).toDate()}
        onTimeChange={(
          visibleTimeStart,
          visibleTimeEnd,
          updateScrollCanvas
        ) => {
          if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
            updateScrollCanvas(minTime, maxTime);
          } else if (visibleTimeStart < minTime) {
            updateScrollCanvas(
              minTime,
              minTime + (visibleTimeEnd - visibleTimeStart)
            );
          } else if (visibleTimeEnd > maxTime) {
            updateScrollCanvas(
              maxTime - (visibleTimeEnd - visibleTimeStart),
              maxTime
            );
          } else {
            updateScrollCanvas(visibleTimeStart, visibleTimeEnd);
          }
        }}
      >
        <TodayMarker />
        {/* <CursorMarker /> */}
      </Timeline>
    </div>
  );
};

export default Timeline2;
