import { AlignItems } from "./types";
import Column from "./Column";
import Row from "./Row";
import "./Layout.stories.css";

export default {
  title: "Components/Layout",
};

const Blocks = () => (
  <>
    <div className="block--small" />
    <div className="block--big" />
    <div className="block--small" />
    <div className="block--big" />
  </>
);
const Title = ({ children }) => {
  return <div className="title">{children}</div>;
};

const RowTemplate = (args) => (
  <Row {...args} className="row">
    <Blocks />
    <Title>{args.align}</Title>
  </Row>
);

const ColumnTemplate = (args) => (
  <Column {...args} className="column">
    <Blocks />
    <Title>{args.align}</Title>
  </Column>
);

const alignItems = ["top", "center", "bottom"];
const justifyContent = ["left", "center", "right"];

function alignments(
  Template: React.FunctionComponent,
  axis1: string[],
  axis2: string[]
) {
  return axis1.reduce(
    (p1: React.ReactNode[], ax1: string) => [
      ...p1,
      axis2.reduce(
        (p2: React.ReactNode[], ax2: string) => [
          ...p2,
          <Template align={`${ax1} ${ax2}`} />,
        ],
        [] as React.ReactNode[]
      ),
    ],
    [] as React.ReactNode[]
  );
}

export const RowLayout = () => (
  <Column>{alignments(RowTemplate, alignItems, justifyContent)}</Column>
);
export const ColumnLayout = () => (
  <Row>{alignments(ColumnTemplate, alignItems, justifyContent)}</Row>
);
