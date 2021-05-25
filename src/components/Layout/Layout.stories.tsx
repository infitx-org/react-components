import { AlignItems } from "./types";
import Column from "./Column";
import Row from "./Row";
import "./Layout.stories.css";

export default {
  title: "Layout",
};

const Block = () => <div className="block--small" />;
const BlockBig = () => <div className="block--big" />;
const Blocks = () => (
  <>
    <Block />
    <BlockBig />
    <Block />
    <BlockBig />
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

function alignments(Template, axis1, axis2) {
  return axis1.reduce(
    (p1, ax1) => [
      ...p1,
      axis2.reduce(
        (p2, ax2) => [...p2, <Template align={`${ax1} ${ax2}`} />],
        []
      ),
    ],
    []
  );
}

export const RowLayout = () => (
  <Column>{alignments(RowTemplate, justifyContent, alignItems)}</Column>
);
export const ColumnLayout = () => (
  <Row>{alignments(ColumnTemplate, alignItems, justifyContent)}</Row>
);
