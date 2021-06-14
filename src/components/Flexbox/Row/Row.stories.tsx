import React from "react";
import Column from "components/Flexbox/Column";
import { Blocks, Title } from "components/Flexbox/Flexbox.stories";
import Row from "./Row";

export default {
  title: "Components/Flexbox/Row",
};

const Template = (args) => (
  <Row {...args}>
    <Blocks />
  </Row>
);

export const Default = Template.bind({});
Default.args = {
  align: undefined,
};

const RowTemplate = (args) => (
  <Row {...args} className="row">
    <Blocks />
    <Title>{args.align}</Title>
  </Row>
);

const alignItems = ["top", "center", "bottom"];
const justifyContent = ["left", "center", "right"];

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
  <Column>{alignments(RowTemplate, alignItems, justifyContent)}</Column>
);
