import React from "react";
import addDays from "date-fns/addDays";
import Calendar from "./Calendar";

export default {
  title: "Components/Calendar",
};

const Template = (args) => <Calendar {...args} />;

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
