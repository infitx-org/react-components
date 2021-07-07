import React from "react";
import ScrollBox from "./ScrollBox";

export default {
  title: "Components/Scrollbox/Ro",
};

// const Template = (args) => (
//   <Row {...args}>
//     <Blocks />
//   </Row>
// );

// export const Default = Template.bind({});
// Default.args = {
//   align: undefined,
// };

const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

export const Content = ({ color }: { color: string }) => (
  <div
    style={{
      background: "#fc9",
      height: "400px",
      padding: "20px",
      fontSize: "12px",
      color,
    }}
  >
    {loremIpsum}
  </div>
);

export const TestScrollBox = () => (
  <div style={{ padding: "10px" }}>
    <ScrollBox style={{ height: "100px", marginBottom: "10px" }}>
      <Content color="white" />
    </ScrollBox>

    <ScrollBox style={{ height: "200px", marginBottom: "10px" }}>
      <Content color="red" />
    </ScrollBox>

    <ScrollBox style={{ height: "300px", marginBottom: "10px" }}>
      <Content color="white" />
    </ScrollBox>
  </div>
);
