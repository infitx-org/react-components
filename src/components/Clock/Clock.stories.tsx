import { Story } from "@storybook/react";
import log from "resources/log";
import Clock, { ClockProps } from "./index";

export default {
  title: "Components/Clock",
  component: Clock,
};

const Template: Story<ClockProps> = (args) => <Clock {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const SelectedTime = Template.bind({});
SelectedTime.args = {
  hour: 11,
  minute: 12,
  second: 40,
};

export const OnTimeChange = Template.bind({});
OnTimeChange.args = {
  hour: 11,
  minute: 12,
  second: 40,
  onChange: log,
};
