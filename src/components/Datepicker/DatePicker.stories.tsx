import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "DatePicker",
};

/* eslint-disable no-console */

export const DatePickerNoState = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <DatePicker pending ref={ref} required onFocus={console.log} />;
};

export const DatePickerValue = () => {
  const [value, setValue] = React.useState("test");
  return (
    <>
      <input type="text" />
      <DatePicker
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        onClear={console.log}
      />
      <input type="text" />
    </>
  );
};
