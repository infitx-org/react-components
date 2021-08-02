/* eslint no-console: "off" */
import React from "react";
import { useInterval } from "../../hooks/useTimeout";
import Table from "./Table";
import Button from "../Button";

export default {
  title: "Components/Table",
  component: Table,
};

// Test component for performance purposes
function Timer() {
  const [time, setTime] = React.useState<number>(0);
  useInterval(() => setTime((prevTime) => prevTime + 1), 1000);
  return <span>Time elapsed: {time}s</span>;
}

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
    label: "Dogs",
  },
  {
    key: "cat",
    label: "Cats",
  },
  {
    key: "bird",
    label: "Birds",
  },
];

const { log } = console;

const Template = ({ Wrapper = undefined, ...args }) => {
  const table = <Table {...args} />;
  if (!Wrapper) {
    return table;
  }
  return <Wrapper>{table}</Wrapper>;
};

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
      fn: () => <Timer />,
    },
  ],
};

export const InitialSortBy = Template.bind({});
InitialSortBy.args = {
  rows,
  columns,
  sortBy: columns[0].label,
};

export const InitialSortByAndDesc = Template.bind({});
InitialSortByAndDesc.args = {
  rows,
  columns,
  sortBy: columns[0].label,
  sortAsc: false,
};

export const Checkable = Template.bind({});
Checkable.args = {
  rows,
  columns,
  checkable: true,
  onCheck: console.log,
};

export const Flexible = Template.bind({});
Flexible.args = {
  rows,
  columns,
  flexible: true,
  Wrapper: ({ children }) => (
    <div
      style={{
        height: "300px",
        padding: "20px",
        border: "2px solid #333",
        display: "flex",
        overflow: "scroll",
      }}
    >
      {children}
    </div>
  ),
};

export const Bordered = Template.bind({});
Bordered.args = {
  rows,
  columns,
  bordered: true,
};

export const ColumnClassname = Template.bind({});
ColumnClassname.args = {
  rows,
  columns: [
    { ...columns[0], className: "custom-background" },
    ...columns.slice(1),
  ],
};

export const HeaderClassname = Template.bind({});
HeaderClassname.args = {
  rows,
  columns: [
    { ...columns[0], headerClassName: "custom-border" },
    ...columns.slice(1),
  ],
};

export const BodyClassname = Template.bind({});
BodyClassname.args = {
  rows,
  columns: [
    { ...columns[0], bodyClassName: "custom-background" },
    ...columns.slice(1),
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

export const CustomSort = Template.bind({});
CustomSort.args = {
  rows,
  columns: [
    ...columns,
    {
      key: "dog",
      label: "Custom Sort",
      sort: (a, b) => {
        if (a.dog > b.dog) return 1;
        if (a.dog < b.dog) return -1;
        return 0;
      },
    },
  ],
};
