import { Story } from "@storybook/react";
import { Size } from "types";
import Icon, { IconProps } from "./Icon";

export default {
  title: "Components/Icon",
  component: Icon,
};

const icon = (
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="20" r="10" />
    <circle cx="50" cy="80" r="10" />
    <circle cx="20" cy="50" r="10" />
    <circle cx="80" cy="50" r="10" />
  </svg>
);

const Template: Story<IconProps> = (args) => <Icon size={50} {...args} />;

export const FillColor = Template.bind({});
FillColor.args = {
  fill: "#f00",
  icon,
};

export const StrokeColor = Template.bind({});
StrokeColor.args = {
  stroke: "#f00",
  fill: "transparent",
  size: 50,
  icon,
};

export const SizeLarge = Template.bind({});
SizeLarge.args = {
  size: Size.Large,
  icon,
};

export const SizeMedium = Template.bind({});
SizeMedium.args = {
  size: Size.Medium,
  icon,
};

export const SizeSmall = Template.bind({});
SizeSmall.args = {
  size: Size.Small,
  icon,
};

export const SizeXSmall = Template.bind({});
SizeXSmall.args = {
  size: Size.XSmall,
  icon,
};
