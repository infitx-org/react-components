import TextField from "components/TextField";
import Icon from "components/Icon";
import Tooltip from "./Tooltip";

export default {
  title: "Components/Tooltip",
  component: Tooltip,
};

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <circle cx="20" cy="20" r="20" />
  </svg>
);

const Template = (args) => (
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

export const Complex = () => (
  <Tooltip label="e" position="right">
    <TextField />
  </Tooltip>
);
