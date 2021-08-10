import { Story } from "@storybook/react";
import TestIcon from "resources/icons/test.svg";
import TextField from "components/TextField";
import Tooltip, { TooltipProps } from "./Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
};

const Template: Story<TooltipProps> = (args) => (
  <Tooltip {...args}>
    <div style={{ margin: "100px", display: "inline-block" }}>
      Hover me to see the tooltip
    </div>
  </Tooltip>
);

export const Default = Template.bind({});
Default.args = {
  label: "I am a Tooltip",
  fixed: undefined,
  position: undefined,
  kind: undefined,
};

export const Top = Template.bind({});
Top.args = {
  ...Default.args,
  position: "top",
};

export const Right = Template.bind({});
Right.args = {
  ...Default.args,
  position: "right",
};

export const Left = Template.bind({});
Left.args = {
  ...Default.args,
  position: "left",
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...Default.args,
  position: "bottom",
};

export const Fixed = Template.bind({});
Fixed.args = {
  ...Default.args,
  fixed: true,
  position: "top",
};

export const Delayed = Template.bind({});
Delayed.args = {
  ...Default.args,
  delay: 1000,
  label: "1 second delay",
  position: "top",
};

export const Content = Template.bind({});
Content.args = {
  content: (
    <div style={{ height: "100px", width: "100px", border: "2px solid red" }} />
  ),
  fixed: true,
  position: "top",
};

export const MultipleTooltips = () => (
  <Tooltip
    label="I am a simple tooltip, but try to focus the textfield"
    position="bottom"
  >
    <TextField
      validation={[
        { active: false, message: "Test" },
        { active: true, message: "invalid" },
        { active: undefined, message: "unknown" },
      ]}
    />
  </Tooltip>
);
