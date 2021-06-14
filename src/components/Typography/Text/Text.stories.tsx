import Column from "components/Flexbox/Column";
import Text from "./Text";

export default {
  title: "components/Typography/Text",
  component: Text,
};

const Template = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "text",
  size: "medium",
  className: undefined,
  style: {},
  underline: false,
  bold: false,
  highlight: false,
  light: false,
  color: "default",
  disabled: false,
  onClick: undefined,
};

export const Bold = Template.bind({});
Bold.args = {
  ...Default.args,
  bold: true,
};

export const Underline = Template.bind({});
Underline.args = {
  ...Default.args,
  underline: true,
};

export const Highlight = Template.bind({});
Highlight.args = {
  ...Default.args,
  highlight: true,
};

export const Light = Template.bind({});
Light.args = {
  ...Default.args,
  light: true,
};

export const Color = Template.bind({});
Color.args = {
  ...Default.args,
  color: "#f33",
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true,
};

export const OnClick = Template.bind({});
OnClick.args = {
  ...Default.args,
  // eslint-disable-next-line
  onClick: console.log,
};

export const Sizes = () => (
  <div>
    <Column>
      <Text size="small">small</Text>
      <Text size="medium">medium</Text>
      <Text size="large">large</Text>
    </Column>
  </div>
);
