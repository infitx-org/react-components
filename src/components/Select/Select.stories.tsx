import React from "react";
import Select from "./Select";

export default {
  title: "Library/Components/Select",
};

/* eslint-disable no-console */
const options = new Array(3).fill(0).map((_, index: number) => ({
  label: index + 1,
  value: index + 1,
}));

const Template = (args) => <Select {...args} options={options} />;

export const Default = Template.bind({});
Default.args = {
  size: "large",
  value: undefined,
  className: undefined,
  placeholder: "Choose a value",
  required: false,
  invalid: false,
  pending: false,
  options,
  onChange: console.log,
  onClear: console.log,
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: options[0].value,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Select a value",
};

export const Pending = Template.bind({});
Pending.args = {
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};

export const OnClear = Template.bind({});
OnClear.args = {
  onClear: console.log,
};
