import React from "react";

import Row from "components/Layout/Row";
import Spinner from "./Spinner";

export default {
  title: "Components/Spinner",
  component: Spinner,
};

export const Default = () => <Spinner />;
export const Colors = () => (
  <Row align="center space-between">
    <Spinner color="#c33" />
    <Spinner color="#3c3" />
    <Spinner color="#33c" />
    <Spinner color="#cc3" />
    <Spinner color="#3cc" />
  </Row>
);

export const PresetSizes = () => (
  <Row align="center space-between">
    <Spinner size="s" />
    <Spinner size="m" />
    <Spinner size="l" />
  </Row>
);

export const NumericSizes = () => (
  <Row align="center space-between">
    <Spinner size={10} />
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
      border: "5px dashed #ccc",
      background: "linear-gradient(30deg, #f8f8f8, #d8d8d8)",
    }}
  >
    <Spinner size={100} center />
  </div>
);
