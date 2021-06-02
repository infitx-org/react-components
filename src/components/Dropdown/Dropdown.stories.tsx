/* eslint no-console: "off" */
import { Size, Kind } from "types";
import Row from "components/Layout/Row";
import Dropdown from "./Dropdown";

export default {
  title: "Components/Dropdown",
  component: Dropdown,
};

const { log } = console;

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
  <Dropdown {...args} onClick={log} label="I am a dropdown">
    <Dropdown.Item>It is a very very long option</Dropdown.Item>
    <Dropdown.Item>It is a very very long option</Dropdown.Item>
  </Dropdown>
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
const sharedProps = (kind) => ({
  size: "medium",
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
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
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
