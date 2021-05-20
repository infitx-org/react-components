import React from "react";
import Field from ".";

export default {
  title: "Field",
};

// const CreditCardExampleField = ({ value, onChange }) => {
//   function formatValue(unformatted: string): string {
//     const chunks = unformatted.replace(/ /g, "").match(/.{1,4}/g) || [];
//     return chunks.join(" ");
//   }
//   return (
//     <Field pending required>
//       <input
//         type="text"
//         inputMode="numeric"
//         value={formatValue(value)}
//         onChange={onChange}
//         style={{ appearance: "none", border: "none", outline: "none" }}
//       />
//     </Field>
//   );
// };

// export const DefaultSimpleMultiField = () => {
//   const [value, setValue] = React.useState("1234123412341234");
//   return (
//     <CreditCardExampleField
//       value={value}
//       onChange={(e) => setValue(e.target.value)}
//     />
//   );
// };

const Template = (args) => <Field {...args} />;
Template.args = {
  children: <span>children render here</span>,
};

export const Default = Template.bind({});
Default.args = {
  ...Template.args,
  kind: "primary",
  size: "large",
  className: undefined,
  required: false,
  invalid: false,
  pending: false,
  disabled: false,
  focused: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Template.args,
  disabled: true,
};

export const Pending = Template.bind({});
Pending.args = {
  ...Template.args,
  pending: true,
};

export const Required = Template.bind({});
Required.args = {
  ...Template.args,
  required: true,
};

export const Invalid = Template.bind({});
Invalid.args = {
  ...Template.args,
  invalid: true,
};

export const Small = Template.bind({});
Small.args = {
  ...Template.args,
  size: "small",
};

export const Medium = Template.bind({});
Medium.args = {
  ...Template.args,
  size: "medium",
};

export const Large = Template.bind({});
Large.args = {
  ...Template.args,
  size: "large",
};

export const StatusChildrenComponent = Template.bind({});
StatusChildrenComponent.args = {
  children: (
    <>
      <div
        style={{
          height: "14px",
          width: "14px",
          borderRadius: "50%",
          background: "#f33",
        }}
      />
      <span style={{ marginLeft: "10px", color: "#F33" }}>test</span>
    </>
  ),
};
