/* eslint no-console: "off" */
import React from "react";

import Row from "components/Layout/Row";
import IconButton from "./IconButton";

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
  >
    <circle cx="20" cy="20" r="15" />
  </svg>
);

export default {
  title: "IconButton",
  component: IconButton,
};

const { log } = console;

const Template = (args) => <IconButton icon={icon} onClick={log} {...args} />;

export const Default = Template.bind({});
Default.args = {
  className: undefined,
  kind: undefined,
  icon,
  size: undefined,
  fill: undefined,
  disabled: undefined,
  onClick: undefined,
};

export const AllKinds = () => (
  <Row align="center center">
    <div className="m5">
      <IconButton icon={icon} onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="primary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="secondary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="tertiary" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="success" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="danger" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="warning" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="dark" onClick={log} />
    </div>
    <div className="m5">
      <IconButton icon={icon} kind="light" onClick={log} />
    </div>
  </Row>
);

export const MultipleSizes = () => (
  <Row align="center center" wrap>
    {[...Array(30).keys()]
      .map((v) => 10 + v * 2)
      .map((size) => (
        <div className="m5" key={size}>
          <IconButton icon={icon} onClick={log} size={size} />
        </div>
      ))}
  </Row>
);
