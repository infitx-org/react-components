import React from "react";
import Select from "./Select";

export default {
  title: "Select",
};

/* eslint-disable no-console */

const options = new Array(10).fill(0).map((_, index: number) => ({
  label: index + 1,
  value: index + 1,
}));

export const SelectNoState = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return (
    <Select
      options={options}
      pending
      ref={ref}
      required
      onFocus={console.log}
    />
  );
};

export const SelectValue = () => {
  const [value, setValue] = React.useState("test");
  return (
    <>
      <input type="text" />
      <Select
        options={options}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        onClear={console.log}
      />
      <input type="text" />
    </>
  );
};
