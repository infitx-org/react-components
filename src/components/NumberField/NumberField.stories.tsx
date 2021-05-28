import NumberField from "./NumberField";

export default {
  title: "Components/NumberField",
};

/* eslint-disable no-console */

const Template = (args) => <NumberField {...args} />;

export const Default = Template.bind({});
Default.args = {
  kind: "primary",
  size: "large",
  value: 3.2,
  disabled: false,
  className: undefined,
  placeholder: "Type something",
  required: false,
  invalid: false,
  pending: false,
  onChange: console.log,
};

export const TypePassword = Template.bind({});
TypePassword.args = {
  type: "password",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Placeholder...",
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
