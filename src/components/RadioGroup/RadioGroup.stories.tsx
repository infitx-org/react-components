/* eslint no-console: "off" */
import React, { useState } from "react";

import RadioGroup from "./RadioGroup";

export default {
  title: "Components/RadioGroup",
  component: RadioGroup,
};

function optionMaker(item, index) {
  return {
    label: `option number ${index + 1}`,
    value: (index + 1).toString(),
  };
}

const options = [
  {
    label: "disabled",
    value: "disabled",
    disabled: true,
  },
  ...[...Array(3)].map(optionMaker),
];

export const Default = () => {
  const [selected, setSelected] = useState("1");
  return (
    <RadioGroup
      label="Default Label"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      selected={selected}
    />
  );
};

export const AllDisabled = () => {
  const [selected, setSelected] = useState("1");
  return (
    <RadioGroup
      label="All Disabled Label"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      selected={selected}
      disabled
    />
  );
};

export const SelectedDisabled = () => {
  const [selected, setSelected] = useState("disabled");
  return (
    <RadioGroup
      label="Selected Disabled Label"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      selected={selected}
    />
  );
};

export const VerticalAlignment = () => {
  const [selected, setSelected] = useState("1");
  return (
    <RadioGroup
      label="Vertical Alignment Label"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      vertical
    />
  );
};

export const Variants = () => {
  const [selected, setSelected] = useState("disabled");
  const c = (
    <RadioGroup
      label="Vertical Alignment Label"
      options={options}
      selected={selected}
      onChange={(e) => setSelected(e.target.value)}
    />
  );
  return (
    <>
      {[
        "primary",
        "secondary",
        "tertiary",
        "success",
        "danger",
        "warning",
        "dark",
        "light",
      ].map((kind) =>
        React.cloneElement(c, { ...c.props, kind, label: kind, name: kind })
      )}
    </>
  );
};
