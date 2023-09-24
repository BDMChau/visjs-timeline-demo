import React, { createContext, useState, useEffect, useContext } from "react";
import DragSelect from "dragselect";

const Context = createContext(null);

function DragSelectProvider({ children, settings = {} }) {
  const [ds, setDS] = useState(null);

  useEffect(() => {
    const area = document.querySelector("#timeline");
    if (area) {
      settings.area = area;
    }

    // ds?.setSettings(settings);

    setDS((prevState) => {
      if (prevState) return prevState;
      return new DragSelect(settings);
    });
    return () => {
      if (ds) {
        ds.stop();
        setDS(null);
      }
    };
  }, [ds, settings]);

  // useEffect(() => {}, [ds, settings]);

  return <Context.Provider value={{ ds, setDS }}>{children}</Context.Provider>;
}

function useDragSelect() {
  return useContext(Context);
}

export { DragSelectProvider, useDragSelect };
