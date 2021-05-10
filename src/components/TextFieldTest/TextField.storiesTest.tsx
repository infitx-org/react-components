import React from "react";
import { TextField, Select } from "./TextField";

export default {
  title: "TextFieldTest",
};

export const TextFormField = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <TextField label="TextField" kind="primary" ref={ref} required />;
};

export const SelectFormField = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <Select label="Select" kind="primary" ref={ref} required />;
};
