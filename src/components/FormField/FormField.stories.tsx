/* eslint-disable no-console */

import FormField from "./FormField";
import Row from "components/Flexbox/Row";
import Button from "components/Button";

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
    <FormField.Container direction="row">
      <FormField required type="text" label="this is a text" size="small" />
      <Button label="test" size="small" />
      <FormField
        required
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
    </FormField.Container>
    <FormField.Container direction="column">
      <FormField.Container direction="row">
        <FormField required type="text" label="this is a text" />
        <Button label="test" />
      </FormField.Container>

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
    </FormField.Container>
  </div>
);
