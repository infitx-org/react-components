import React from "react";
import Field from "../Field";

export default {
  title: "Field",
};

export const DefaultField = () => {
  return (
    <Field pending required>
      <div
        style={{
          height: "14px",
          width: "14px",
          borderRadius: "50%",
          background: "#f33",
        }}
      />
      <span style={{ marginLeft: "10px", color: "#F33" }}>test</span>
    </Field>
  );
};

const DefaultSimpleMultiFieldComponent = ({ value, onChange }) => {
  function formatValue(unformatted: string): string {
    const chunks = unformatted.replace(/ /g, "").match(/.{1,4}/g) || [];
    return chunks!.join(" ");
  }
  return (
    <Field pending required>
      <input
        type="text"
        inputMode="numeric"
        value={formatValue(value)}
        onChange={onChange}
      />
    </Field>
  );
};

export const DefaultSimpleMultiField = () => {
  const [value, setValue] = React.useState("123123123123123123");
  return (
    <DefaultSimpleMultiFieldComponent
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
