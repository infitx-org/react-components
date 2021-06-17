/* eslint-disable no-console */

import FormField, { FormFields } from "./FormField";

export default {
  title: "Components/FormField",
};

const Template = (args) => <FormField {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "text",
  kind: "primary",
  size: "large",
  value: "test",
  disabled: false,
  className: undefined,
  placeholder: "Type something",
  required: false,
  invalid: false,
  pending: false,
  onChange: console.log,
  validation: [
    { active: false, message: "Test" },
    { active: true, message: "invalid" },
    { active: undefined, message: "unknown" },
  ],
};

const options = Array.from([1, 2, 3], (x) => ({
  label: x.toString(),
  value: x.toString(),
}));

const options2 = Array.from([4, 5, 6], (x) => ({
  label: x.toString(),
  value: x.toString(),
}));
export const Test = () => (
  <div>
    <FormFields direction="row">
      <FormField type="text" label="this is a text" size="small" />
      <FormField
        type="select"
        label="this is a text"
        size="small"
        options={options}
      />
      <FormField type="checkbox" label="this is a checkbox" />
      <FormField
        name="test1"
        type="radio"
        label="this is a horizontal radiogroup"
        options={options}
        onChange={console.log}
      />
      <FormField
        name="test2"
        type="radio"
        label="this is a vertical radiogroup"
        vertical
        options={options2}
        onChange={console.log}
      />
    </FormFields>
    <FormFields>
      <FormField type="text" label="this is a text" />
      <FormField type="checkbox" label="this is a checkbox" />
      <FormField
        name="test3"
        type="radio"
        label="this is a horizontal radiogroup"
        options={options}
        onChange={console.log}
      />
      <FormField
        name="test4"
        type="radio"
        label="this is a vertical radiogroup"
        vertical
        options={options2}
        onChange={console.log}
      />
    </FormFields>
  </div>
);

export const TypePassword = Template.bind({});
TypePassword.args = {
  ...Default.args,
  type: "password",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  ...Default.args,
  placeholder: "Placeholder...",
};

export const Pending = Template.bind({});
Pending.args = {
  ...Default.args,
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Default.args,
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

export const Validation = () => {
  const onFocus = () => {
    setTimeout(() => console.log(document.activeElement), 100);
  };
  return (
    <FormField
      type="text"
      label="O!"
      validation={[{ active: true, message: "Hey!" }]}
      onFocus={onFocus}
    />
  );
};
