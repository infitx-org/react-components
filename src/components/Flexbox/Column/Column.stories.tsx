import { Story } from "@storybook/react";
import React from "react";
import Row from "components/Flexbox/Row";
import { Blocks, Title } from "components/Flexbox/Flexbox.stories";
import Column, { ColumnProps } from "./Column";

export default {
  title: "Components/Flexbox/Column",
  component: Column,
};

const Template: Story<ColumnProps> = (args) => (
  <Column {...args}>
    <Blocks />
  </Column>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};

const alignItems = ["left", "center", "right"];
const justifyContent = ["top", "center", "bottom"];

function alignments(axis1: string[], axis2: string[]) {
  return axis1.reduce(
    (p1: React.ReactNode[], ax1: string) => [
      ...p1,
      axis2.reduce(
        (p2: React.ReactNode[], ax2: string) => [
          ...p2,
          <Column
            align={`${ax1} ${ax2}` as ColumnProps["align"]}
            className="column"
          >
            <Blocks />
            <Title>{`${ax1} ${ax2}`}</Title>
          </Column>,
        ],
        [] as React.ReactNode[]
      ),
    ],
    [] as React.ReactNode[]
  );
}

export const Alignments = () => (
  <Row>{alignments(justifyContent, alignItems)}</Row>
);
