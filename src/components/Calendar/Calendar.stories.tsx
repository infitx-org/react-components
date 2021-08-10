import { Story } from "@storybook/react";
import addDays from "date-fns/addDays";
import Calendar, { CalendarProps } from "./Calendar";

export default {
  title: "Components/Calendar",
  component: Calendar,
};

const Template: Story<CalendarProps> = (args) => <Calendar {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const InitialMonth = Template.bind({});
InitialMonth.args = {
  initialMonth: 11,
};

export const InitialYear = Template.bind({});
InitialYear.args = {
  initialYear: 2002,
};

export const SelectedDate = Template.bind({});
SelectedDate.args = {
  selectedDate: addDays(new Date(), -3),
};

export const SelectedRange = Template.bind({});
SelectedRange.args = {
  selectedRange: [addDays(new Date(), -3), addDays(new Date(), 2)],
};

export const onDayClick = Template.bind({});
onDayClick.args = {
  onDayClick: console.log,
};

export const OnDateRangeClick = Template.bind({});
OnDateRangeClick.args = {
  onDateRangeClick: console.log,
};

export const DisabledDays = Template.bind({});
DisabledDays.args = {
  disabledDays: (day) => day.getDay() === 0,
};
