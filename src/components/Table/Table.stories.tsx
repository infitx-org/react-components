/* eslint no-console: "off" */
import Table from "./Table";
import Button from "../Button";

export default {
  title: "Components/Table",
  component: Table,
};

const baseSuffixes = ["man", "boy", "ish", "car", "boat", "food", "house"];
const suffixes: string[] = [];

for (let i = 10; i > 0; i -= 1) {
  suffixes.push(...baseSuffixes);
}

const col = (suffix: string) => ({
  dog: `dog-${suffix}`,
  cat: `cat-${suffix}`,
  bird: `bird-${suffix}`,
});

const rows = suffixes.map((suffix) => col(suffix));

const columns = [
  {
    key: "dog",
    label: "cat",
  },
  {
    key: "cat",
    label: "cat",
  },
  {
    key: "bird",
    label: "bird",
  },
];

const { log } = console;

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});
Default.args = {
  rows,
  columns,
};

export const RenderComponents = Template.bind({});
RenderComponents.args = {
  rows,
  columns: [
    ...columns,
    {
      key: "dog",
      label: "Component",
      fn: (key: string) => <Button label={key} onClick={log} />,
    },
  ],
};

export const CustomFilter = Template.bind({});
CustomFilter.args = {
  rows,
  columns: [
    ...columns,
    {
      key: "dog",
      label: "Custom Filter",
      search: (_: unknown, originalValue: string, value: string) =>
        originalValue.endsWith(value),
    },
  ],
};

export const Checkable = Template.bind({});
Checkable.args = {
  rows,
  columns,
  checkable: true,
};
