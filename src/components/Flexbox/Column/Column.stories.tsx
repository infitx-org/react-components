import React from "react";
import Row from "components/Flexbox/Row";
import { Blocks, Title } from "components/Flexbox/Flexbox.stories";
import Column from "./Column";

export default {
  title: "Components/Flexbox/Column",
};

const Template = (args) => (
  <Column {...args}>
    <Blocks />
  </Column>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};

const ColumnTemplate = (args) => (
  <Column {...args} className="column">
    <Blocks />
    <Title>{args.align}</Title>
  </Column>
);

const alignItems = ["left", "center", "right"];
const justifyContent = ["top", "center", "bottom"];

function alignments(
  TemplateComponent: React.FunctionComponent,
  axis1: string[],
  axis2: string[]
) {
  return axis1.reduce(
    (p1: React.ReactNode[], ax1: string) => [
      ...p1,
      axis2.reduce(
        (p2: React.ReactNode[], ax2: string) => [
          ...p2,
          <TemplateComponent align={`${ax1} ${ax2}`} />,
        ],
        [] as React.ReactNode[]
      ),
    ],
    [] as React.ReactNode[]
  );
}

export const Alignments = () => (
  <Row>{alignments(ColumnTemplate, justifyContent, alignItems)}</Row>
);
