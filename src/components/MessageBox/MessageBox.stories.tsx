import Row from "components/Flexbox/Row";
import { Kind } from "types";
import TestIcon from "resources/icons/test.svg";
import MessageBox from "./MessageBox";

export default {
  title: "Components/MessageBox",
  component: MessageBox,
};

const icon = <TestIcon />;

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
