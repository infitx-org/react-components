import { Size, Kind } from "types";
import Button from "components/Button";
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
    <Button label="hola!" style={{ margin: "100px" }} />
  </Tooltip>
);

export const Top = Template.bind({});
Top.args = {
  label: "I am a Tooltip",
  position: "top",
};

export const Right = Template.bind({});
Right.args = {
  ...Top.args,
  position: "right",
};

export const Left = Template.bind({});
Left.args = {
  ...Top.args,
  position: "left",
};

export const Bottom = Template.bind({});
Bottom.args = {
  ...Top.args,
  position: "bottom",
};

export const Fixed = Template.bind({});
Fixed.args = {
  fixed: true,
  ...Top.args,
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
