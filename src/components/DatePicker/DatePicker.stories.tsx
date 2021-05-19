import React from "react";
import DatePicker from "./DatePicker";

export default {
  title: "DatePicker",
};

/* eslint-disable no-console */

const Template = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "large",
  value: undefined,
  className: undefined,
  placeholder: "Choose a date",
  required: false,
  invalid: false,
  pending: false,
  onSelect: console.log,
};

export const SelectedDate = Template.bind({});
SelectedDate.args = {
  value: new Date(),
};
export const Format = Template.bind({});
Format.args = {
  format: "MM/dd/yyyy",
  value: new Date(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "DatePicker a value",
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
