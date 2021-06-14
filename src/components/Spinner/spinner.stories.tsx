import React from "react";

import Row from "components/Flexbox/Row";
import Spinner from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
};

const Template = (args) => <Spinner {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "small",
  kind: "primary",
  color: undefined,
};

export const Color = Template.bind({});
Color.args = {
  color: "#f33",
};

export const PresetSizes = () => (
  <Row align="center space-between">
    <Spinner size="small" />
    <Spinner size="medium" />
    <Spinner size="large" />
  </Row>
);

export const NumericSizes = () => (
  <Row align="center space-between">
    <Spinner size={20} />
    <Spinner size={30} />
    <Spinner size={40} />
    <Spinner size={50} />
    <Spinner size={60} />
    <Spinner size={100} />
  </Row>
);

export const CenteredRelativeToParent = () => (
  <div
    style={{
      height: "400px",
      width: "400px",
      borderRadius: "10%",
      background: "linear-gradient(30deg, #f8f8f8, #e8e8e8)",
    }}
  >
    <Spinner size={100} center />
  </div>
);
