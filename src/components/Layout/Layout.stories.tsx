import { Meta, Story, Canvas } from "@storybook/addon-docs/blocks";
import Column from "./Column";
import Row from "./Row";

export default {
  title: "Layout",
};

const wrapperStyle = {
  backgroundColor: "#ddd",
  borderRadius: "5px",
  height: "100px",
  margin: "5px",
};

const smallBlockStyle = {
  background: "#333",
  margin: "5px",
  height: "20px",
  width: "20px",
  borderRadius: "10%",
};

const bigBlockStyle = {
  background: "#666",
  margin: "5px",
  height: "40px",
  width: "40px",
  borderRadius: "10%",
};

const Block = () => <div style={smallBlockStyle} />;
const BlockBig = () => <div style={bigBlockStyle} />;

const Blocks = () => (
  <>
    <Block />
    <BlockBig />
    <Block />
    <BlockBig />
  </>
);

const Template = (args) => (
  <Row {...args} style={wrapperStyle}>
    <Blocks />
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};
