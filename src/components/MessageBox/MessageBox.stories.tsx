import Row from "components/Layout/Row";
import { Kind } from "types";
import MessageBox from "./MessageBox";

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

export default {
  title: "MessageBox",
  component: MessageBox,
};

const Template = (args) => <MessageBox {...args} />;

export const Default = Template.bind({});
Default.args = {
  message: "I am a MessageBox",
  kind: "default",
  className: undefined,
  id: undefined,
  icon: undefined,
  fill: undefined,
  active: undefined,
};

export const MultipleMessages = Template.bind({});
MultipleMessages.args = {
  ...Default.args,
  message: ["First", "Second", "Third"],
};

export const Active = Template.bind({});
Active.args = {
  ...Default.args,
  active: true,
};

export const Centered = Template.bind({});
Centered.args = {
  ...Default.args,
  center: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  icon,
};

export const WithIconFill = Template.bind({});
WithIconFill.args = {
  ...Default.args,
  icon,
  fill: "#f00",
};

export const WithId = Template.bind({});
WithId.args = {
  ...Default.args,
  id: "test-id",
};

const VariantsTemplate = (args) => (
  <Row align="space-between">
    <MessageBox message="default" kind="default" {...args} />
    {Object.values(Kind).map((kind) => {
      return <MessageBox key={kind} message={kind} kind={kind} {...args} />;
    })}
  </Row>
);
export const Variants = VariantsTemplate.bind({});
Variants.args = {};

export const VariantsInverted = VariantsTemplate.bind({});
VariantsInverted.args = {
  inverted: true,
};

export const VariantsWithIcon = VariantsTemplate.bind({});
VariantsWithIcon.args = {
  icon,
};

export const VariantsActive = VariantsTemplate.bind({});
VariantsActive.args = {
  active: true,
  icon,
};
