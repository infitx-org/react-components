import React from "react";
import Checkbox from "./Checkbox";

export default {
  title: "Components/Checkbox",
  component: Checkbox,
};

const Template = (args) => <Checkbox label="Default Checkbox" {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: "Default Checkbox",
  // eslint-disable-next-line no-console
  onChange: console.log,
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

export const HTMLName = Template.bind({});
HTMLName.args = {
  label: "HTMLName Checkbox",
  name: "test-name",
};

export const Variants = () => {
  const c = <Checkbox checked />;
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
        React.cloneElement(c, {
          ...c.props,
          kind,
          label: kind,
          name: kind,
          disabled: true,
        })
      )}
    </>
  );
};
