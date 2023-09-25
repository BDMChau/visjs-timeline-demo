import React, { createContext, useState, useEffect, useContext } from "react";
import DragSelect from "dragselect";
import isEmpty from "lodash/isEmpty";

const DragSelectContext = createContext(null);

function DragSelectProvider({ children, settings = {} }) {
  const [ds, setDS] = useState(null);

  useEffect(() => {
    const area = document.querySelector("#timeline");
    if (area) {
      settings.area = area;
    }

    if (isEmpty(ds)) {
      setDS(new DragSelect(settings));
    }

    return () => {
      if (!isEmpty(ds)) {
        ds.stop();
        setDS(null);
      }
    };
  }, [ds, settings]);

  return (
    <DragSelectContext.Provider value={{ ds, setDS }}>
      {children}
    </DragSelectContext.Provider>
  );
}

const useDragSelectContext = () => {
  return useContext(DragSelectContext);
};

export { DragSelectProvider, useDragSelectContext };
