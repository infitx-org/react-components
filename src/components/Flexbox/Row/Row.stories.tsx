import { Story } from "@storybook/react";
import React from "react";
import Column from "components/Flexbox/Column";
import { Blocks, Title } from "components/Flexbox/Flexbox.stories";
import Row, { RowProps } from "./Row";

export default {
  title: "Components/Flexbox/Row",
};

const Template: Story<RowProps> = (args) => (
  <Row {...args}>
    <Blocks />
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};

const alignItems = ["top", "center", "bottom"];
const justifyContent = ["left", "center", "right"];

function alignments(axis1: string[], axis2: string[]) {
  return axis1.reduce(
    (p1: React.ReactNode[], ax1: string) => [
      ...p1,
      axis2.reduce(
        (p2: React.ReactNode[], ax2: string) => [
          ...p2,
          <Row align={`${ax1} ${ax2}` as RowProps["align"]} className="row">
            <Blocks />
            <Title>{`${ax1} ${ax2}`}</Title>
          </Row>,
        ],
        [] as React.ReactNode[]
      ),
    ],
    [] as React.ReactNode[]
  );
}

export const Alignments = () => (
  <Column>{alignments(alignItems, justifyContent)}</Column>
);
