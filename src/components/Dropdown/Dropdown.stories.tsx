/* eslint no-console: "off" */
import { Story } from "@storybook/react";
import { Size, Kind } from "types";
import TestIcon from "resources/icons/test.svg";
import Row from "components/Flexbox/Row";
import Dropdown, { DropdownProps } from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
  subcomponents: {
    "Dropdown.Item": Dropdown.Item,
  },
};

const { log } = console;

const icon = <TestIcon />;

const Template: Story<DropdownProps> = (args) => (
  <Dropdown {...args} onClick={log} label="I am a dropdown">
    <Dropdown.Item onClick={log}>It is a very very long option</Dropdown.Item>
    <Dropdown.Item>It is a very very long option</Dropdown.Item>
  </Dropdown>
);

export const Default = Template.bind({});
Default.args = {
  children: undefined,
  label: undefined,
  className: undefined,
  id: undefined,
  kind: undefined,
  size: undefined,
  noFill: undefined,
  disabled: undefined,
  pending: undefined,
  style: undefined,
  onClick: undefined,
  onKeyDown: undefined,
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

const kinds = Object.values(Kind);
const sharedProps = (kind) => ({
  size: Size.Medium,
  style: {
    margin: "2px",
  },
  onClick: log,
  label: kind,
  kind,
  key: kind,
});

export const Kinds = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)}>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} noFill>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
  </>
);

export const KindsWithIcon = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} icon={icon}>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} noFill icon={icon}>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
  </>
);

export const KindsPeding = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} pending>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} noFill pending>
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
  </>
);

export const Sizes = () => (
  <>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} size="small">
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} size="medium">
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
    <Row align="center space-between">
      {kinds.map((kind) => (
        <Dropdown {...sharedProps(kind)} size="large">
          <Dropdown.Item onClick={log}>Number one!</Dropdown.Item>
          <Dropdown.Item onClick={log}>Number two!</Dropdown.Item>
        </Dropdown>
      ))}
    </Row>
  </>
);
