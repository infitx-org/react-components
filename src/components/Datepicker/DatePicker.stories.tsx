import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "DatePicker",
};

/* eslint-disable no-console */

export const WithoutNoState = () => {
  return (
    <DatePicker pending required onFocus={console.log} onBlur={console.log} />
  );
};

export const WithStateValue = () => {
  const [value, setValue] = React.useState<string | undefined>(
    new Date().toString()
  );
  return (
    <DatePicker
      label="test"
      value={value}
      onSelect={(date) => {
        setValue(date?.toString());
      }}
    />
  );
};

export const FormatDate = () => {
  return <DatePicker value={new Date().toString()} format="dd yyyy" />;
};
