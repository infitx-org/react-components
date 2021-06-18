/* eslint-disable no-console */

import FormField from "./FormField";

export default {
  title: "Components/FormField",
};

const Template = (args) => <FormField {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: "number",
  kind: "primary",
  size: "large",
  value: "test",
  label: "this is a label",
  disabled: false,
  className: undefined,
  placeholder: "Type something",
  required: true,
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

const { log } = console;

export const ColumnLayout = () => (
  <FormField.Container direction="column">
    <FormField.Container direction="row">
      <FormField required type="text" label="this is a text" />
      <FormField type="button" label="test" onClick={log} />
    </FormField.Container>

    <FormField type="checkbox" label="this is a checkbox" />

    <FormField
      name="test3"
      type="radio"
      label="this is a horizontal radiogroup"
      options={options}
      onChange={log}
    />
    <FormField
      name="test4"
      type="radio"
      label="vertical radiogroup"
      vertical
      options={options}
      onChange={log}
    />
  </FormField.Container>
);

export const RowLayout = () => (
  <FormField.Container direction="row">
    <FormField required type="text" label="this is a text" size="small" />
    <FormField type="button" label="test" size="small" onClick={log} />
    <FormField
      required
      type="select"
      label="this is a text"
      size="small"
      options={options}
    />
  </FormField.Container>
);

export const ComplexLayout = () => (
  <FormField.Container direction="column">
    <FormField.Container direction="row">
      <FormField required type="text" label="this is a text" />
      <FormField
        required
        type="select"
        label="this is a select"
        options={options}
      />
      <FormField required type="date" label="this is a datepicker" />
      <FormField type="button" label="test" onClick={log} />
    </FormField.Container>
    <FormField.Container direction="row">
      <FormField type="text" label="this is a text" />
      <FormField type="text" label="this is a text" />
      <FormField type="text" label="this is a text" />
      <FormField type="button" label="test" onClick={log} />
    </FormField.Container>
    <FormField.Container direction="row" align="stretch left">
      <FormField.Container direction="column">
        <FormField type="text" label="this is a text" />
        <FormField type="button" label="test" onClick={log} />
        <FormField type="text" label="this is a text" />
      </FormField.Container>
      <FormField.Container direction="column">
        <FormField type="text" label="this is a text" />
        <FormField type="button" label="test" onClick={log} />
        <FormField type="text" label="this is a text" />
      </FormField.Container>
      <FormField.Container direction="column" align="bottom flex-end">
        <FormField size="small" type="text" label="this is a text" />
        <FormField size="small" type="text" label="this is a text" />
        <FormField size="small" type="text" label="this is a text" />
      </FormField.Container>
    </FormField.Container>
  </FormField.Container>
);
