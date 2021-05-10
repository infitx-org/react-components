import React from "react";
import Select from "./Select";

export default {
  title: "Select",
};

/* eslint-disable no-console */

export const SelectNoState = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <Select pending ref={ref} required onFocus={console.log} />;
};

export const SelectValue = () => {
  const [value, setValue] = React.useState("test");
  return (
    <Select value={value} onChange={(e) => setValue(e.target.value)} required />
  );
};
