import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "DatePicker",
};

/* eslint-disable no-console */

export const WithoutNoState = () => {
  return <DatePicker pending required />;
};

export const WithStateValue = () => {
  const [value, setValue] = React.useState<string | undefined>(
    new Date().toString()
  );
  return (
    <DatePicker
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
