import React from "react";
import Field from ".";

export default {
  title: "Field",
};

export const DefaultField = () => {
  return (
    <Field>
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

const CreditCardExampleField = ({ value, onChange }) => {
  function formatValue(unformatted: string): string {
    const chunks = unformatted.replace(/ /g, "").match(/.{1,4}/g) || [];
    return chunks.join(" ");
  }
  return (
    <Field pending required>
      <input
        type="text"
        inputMode="numeric"
        value={formatValue(value)}
        onChange={onChange}
        style={{ appearance: "none", border: "none", outline: "none" }}
      />
    </Field>
  );
};

export const DefaultSimpleMultiField = () => {
  const [value, setValue] = React.useState("1234123412341234");
  return (
    <CreditCardExampleField
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};
