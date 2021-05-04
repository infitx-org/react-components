/* eslint no-console: "off" */
// import { createOptionalValidation, validate, vd } from 'utils/validation';
import React, { useState } from "react";

import RadioGroup from "./RadioGroup";

export default {
  title: "RadioGroup",
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
      name="test"
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
      name="test"
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
      name="test"
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
      name="test"
      label="Vertical Alignment Label"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      vertical
    />
  );
};
