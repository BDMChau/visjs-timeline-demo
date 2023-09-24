import React from "react";
import { SelectableGroup } from "react-selectable-fast";

const Selectable = ({ children, selectionFinish }) => {
  const handleSelectionFinish = (props) => {
    console.log("Selected", props);
    selectionFinish && selectionFinish(props);
  };

  return (
    <SelectableGroup
      className="selectAble"
      clickClassName="tick"
      enableDeselect
      tolerance={1}
      deselectOnEsc
      disabled={false}
      allowClickWithoutSelected={false}
      // duringSelection={this.handleSelecting}
      // onSelectionClear={this.handleSelectionClear}
      onSelectionFinish={handleSelectionFinish}
      // onSelectedItemUnmount={this.handleSelectedItemUnmount}
      ignoreList={[
        ".not-selectable",
        // ".item:nth-child(10)",
        // ".item:nth-child(27)",
      ]}
    >
      {children}
    </SelectableGroup>
  );
};

export default Selectable;
