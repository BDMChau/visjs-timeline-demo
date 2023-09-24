import React from "react";
import { createSelectable } from "react-selectable-fast";

const SelectableItem = ({ item, selected }) => {
  return (
    <div
      className="myItem"
      key={item.id}
      id={item.id}
      style={{ background: selected ? "green" : "unset" }}
    >
      {item.content}
    </div>
  );
};

export default SelectableItem;
