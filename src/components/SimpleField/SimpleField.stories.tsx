import React from "react";
import SimpleField from "./SimpleField";

export default {
  title: "SimpleField",
};

export const DefaultSimpleField = () => {
  return (
    <SimpleField pending required>
      <div style={{ height: "10px", width: "10px", background: "#f33" }} />
      <span style={{ color: "#F33" }}>test</span>
    </SimpleField>
  );
};

const DefaultSimpleMultiFieldComponent = ({ value, onChange }) => {
  function formatValue(unformatted: string): string {
    const chunks = unformatted.replace(/ /g, "").match(/.{1,4}/g) || [];
    return chunks!.join(" ");
  }
  return (
    <SimpleField pending required>
      <input
        type="text"
        inputMode="numeric"
        value={formatValue(value)}
        onChange={onChange}
      />
    </SimpleField>
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
