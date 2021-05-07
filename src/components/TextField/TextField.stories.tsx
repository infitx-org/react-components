import React from "react";
import TextField from "./TextField";

export default {
  title: "TextField",
  component: TextField,
};

export const Template = () => {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (ref.current) {
      setTimeout(() => ref.current?.focus(), 100);
    }
  }, [ref.current]);

  return <TextField label="Default TextField" kind="primary" ref={ref} />;
};
