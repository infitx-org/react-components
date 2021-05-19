import React from "react";
import Select from "./Select";

export default {
  title: "Select",
};

/* eslint-disable no-console */
const options = new Array(10).fill(0).map((_, index: number) => ({
  label: index + 1,
  value: index + 1,
}));

const Template = (args) => <Select {...args} options={options} />;

export const Default = Template.bind({});
Default.args = {
  size: "large",
  value: undefined,
  className: undefined,
  placeholder: "Choose a value",
  required: false,
  invalid: false,
  pending: false,
  options,
  onChange: console.log,
  onClear: console.log,
};

export const SelectedValue = Template.bind({});
SelectedValue.args = {
  value: options[0].value,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Select a value",
};

export const Pending = Template.bind({});
Pending.args = {
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  invalid: true,
};

export const Small = Template.bind({});
Small.args = {
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  size: "large",
};

export const OnClear = Template.bind({});
OnClear.args = {
  onClear: console.log,
};

// export const SelectNoState = () => {
//   const ref = React.useRef<HTMLInputElement>(null);
//   React.useEffect(() => {
//     if (ref.current) {
//       setTimeout(() => ref.current?.focus(), 100);
//     }
//   }, [ref.current]);

//   return (
//     <Select
//       invalid
//       options={options}
//       pending
//       ref={ref}
//       required
//       onFocus={console.log}
//       onBlur={console.log}
//     />
//   );
// };

// export const SelectValue = () => {
//   const [value, setValue] = React.useState<string | number | boolean>(
//     options[0].value
//   );
//   return (
//     <>
//       <div style={{ height: "200px" }} />
//       <div
//         style={{
//           height: "300px",
//           background: "#eee",
//           overflow: "hidden",
//           paddingTop: "150px",
//         }}
//       >
//         <Select
//           placeholder="try"
//           options={options}
//           value={value}
//           onChange={setValue}
//           required
//           onClear={console.log}
//         />
//       </div>
//       <div style={{ height: "200px" }} />
//     </>
//   );
// };
