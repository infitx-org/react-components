/* eslint no-console: "off" */
import { Story } from "@storybook/react";
import { Size, Kind } from "types";
import TestIcon from "resources/icons/test.svg";
import Row from "components/Flexbox/Row";
import Button, { ButtonProps } from "./Button";

export default {
  title: "Components/Button",
  component: Button,
};

const { log } = console;
const icon = <TestIcon />;

const Template: Story<ButtonProps> = (args) => (
  <Button {...args} onClick={log} label="I am a button" />
);

export const Default = Template.bind({});
Default.args = {
  children: undefined,
  icon: undefined,
  label: undefined,
  className: undefined,
  id: undefined,
  kind: undefined,
  size: undefined,
  iconPosition: undefined,
  noFill: undefined,
  disabled: undefined,
  pending: undefined,
  style: undefined,
  onClick: undefined,
  onKeyDown: undefined,
  tooltipLabel: "test",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Pending = Template.bind({});
Pending.args = {
  pending: true,
};

export const NoFill = Template.bind({});
NoFill.args = {
  noFill: true,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  icon,
};

export const WithIconOnTheRight = Template.bind({});
WithIconOnTheRight.args = {
  icon,
  iconPosition: "right",
};

const kinds = Object.values(Kind);

const sharedProps = (kind: ButtonProps["kind"]): ButtonProps => ({
  size: Size.Medium,
  style: {
    margin: "2px",
  },
  onClick: log,
  label: kind,
  kind,
});

export const Kinds = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} />
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} noFill />
      ))}
    </Row>
  </>
);

export const KindsWithIcon = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} icon={icon} />
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} noFill icon={icon} />
      ))}
    </Row>
  </>
);

export const KindsPeding = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} pending />
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} noFill pending />
      ))}
    </Row>
  </>
);

export const Sizes = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} size="small" />
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} size="medium" />
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Button {...sharedProps(kind)} key={kind} size="large" />
      ))}
    </Row>
  </>
);
