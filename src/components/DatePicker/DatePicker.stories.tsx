import { Story } from "@storybook/react";
import DatePicker, { DatePickerProps } from "./DatePicker";

export default {
  title: "Components/DatePicker",
  component: DatePicker,
};

/* eslint-disable no-console */

const Template: Story<DatePickerProps> = (args) => <DatePicker {...args} />;

export const Default = Template.bind({});
Default.args = {
  kind: "primary",
  size: "large",
  value: undefined,
  className: undefined,
  placeholder: "Choose a date",
  disabled: false,
  required: false,
  invalid: false,
  pending: false,
  onChange: console.log,
};

export const SelectedDate = Template.bind({});
SelectedDate.args = {
  value: new Date().toISOString(),
};
export const Format = Template.bind({});
Format.args = {
  format: "MM/dd/yyyy",
  value: new Date().toISOString(),
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Pick a date",
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
