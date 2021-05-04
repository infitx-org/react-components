import Checkbox from "./Checkbox";

export default {
  title: "Checkbox",
  component: Checkbox,
};

const Template = (args) => (
  <Checkbox name="test1" label="Default Checkbox" {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: "Default Checkbox",
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  label: undefined,
};

export const Checked = Template.bind({});
Checked.args = {
  label: "Checked Checkbox",
  checked: true,
};

export const SemiChecked = Template.bind({});
SemiChecked.args = {
  label: "Semi Checked Checkbox",
  semi: true,
};

export const Round = Template.bind({});
Round.args = {
  label: "Round Checkbox",
  round: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: "Disabled Checkbox",
  disabled: true,
};

export const OnChange = Template.bind({});
OnChange.args = {
  label: "OnChange Checkbox",
  // eslint-disable-next-line no-console
  onChange: console.log,
};
