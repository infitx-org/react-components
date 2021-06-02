import Column from "components/Layout/Column";
import Heading from "./Heading";

export default {
  title: "components/Typography/Heading",
  component: Heading,
};

export const Sizes = () => (
  <div>
    <Column>
      <Heading size="1">Heading Size 1</Heading>
      <Heading size="2">Heading Size 2</Heading>
      <Heading size="3">Heading Size 3</Heading>
      <Heading size="4">Heading Size 4</Heading>
      <Heading size="5">Heading Size 5</Heading>
      <Heading size="6">Heading Size 6</Heading>
    </Column>
  </div>
);
