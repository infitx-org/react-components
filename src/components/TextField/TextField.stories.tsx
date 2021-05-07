import React from "react";
import { TextField, Select } from "./TextField";

export default {
  title: "TextField",
};

export const TextFormField = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <TextField label="Default TextField" kind="primary" ref={ref} />;
};

export const SelectFormField = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <Select label="Default Select" kind="primary" ref={ref} pending />;
};
