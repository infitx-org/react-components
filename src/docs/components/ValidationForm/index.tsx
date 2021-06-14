import React from "react";
import Row from "components/Flexbox/Row";
import Column from "components/Flexbox/Column";
import TextField from "components/TextField";

export default function FormTheme() {
  const [value, setValue] = React.useState("");
  const validation = [];
  validation.push({ active: true, message: "is true" });
  if (value === "test") {
    validation.push({ active: false, message: "is false" });
  }
  return (
    <Column align="top left">
      <Row style={{ margin: "5px" }}>
        <TextField
          size="small"
          value={value}
          onChange={setValue}
          validation={validation}
        />
      </Row>
    </Column>
  );
}
