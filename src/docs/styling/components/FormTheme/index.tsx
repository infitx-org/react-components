import React from "react";
import Row from "components/Layout/Row";
import Column from "components/Layout/Column";
import Checkbox from "components/Checkbox";
import RadioGroup from "components/RadioGroup";
import Select from "components/Select";
import Button from "components/Button";

export default function FormTheme() {
  const options = [
    "primary",
    "secondary",
    "tertiary",
    "success",
    "danger",
    "warning",
    "dark",
    "light",
  ].map((v) => ({
    label: v,
    value: v,
  }));
  const [kind, setKind] = React.useState("primary");
  return (
    <Column align="top left">
      <Row style={{ margin: "5px" }}>
        <Select
          size="small"
          kind={kind}
          value={kind}
          onChange={setKind}
          options={options}
        />
      </Row>
      <Row style={{ margin: "5px" }}>
        <Button
          kind={kind}
          onClick={() => setKind(undefined)}
          disabled={!kind}
          label={`unset ${kind}`}
        />
      </Row>
      <Row style={{ margin: "5px" }}>
        <Checkbox
          kind={kind}
          checked={!!kind}
          label="has selected kind"
          disabled={!kind}
          onChange={() => setKind(undefined)}
        />
      </Row>
      <Row style={{ margin: "5px" }}>
        <RadioGroup
          selected={kind}
          options={options}
          kind={kind}
          onChange={(e) => setKind(e.target.value)}
        />
      </Row>
    </Column>
  );
}
