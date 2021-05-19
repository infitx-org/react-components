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
      invalid
      options={options}
      pending
      ref={ref}
      required
      onFocus={console.log}
      onBlur={console.log}
    />
  );
};

export const SelectValue = () => {
  const [value, setValue] = React.useState<string | number | boolean>(
    options[0].value
  );
  return (
    <>
      <div style={{ height: "200px" }} />
      <div
        style={{
          height: "300px",
          background: "#eee",
          overflow: "hidden",
          paddingTop: "150px",
        }}
      >
        <Select
          placeholder="try"
          options={options}
          value={value}
          onChange={setValue}
          required
          onClear={console.log}
        />
      </div>
      <div style={{ height: "200px" }} />
    </>
  );
};
