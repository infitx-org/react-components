/* eslint no-console: "off" */
// import { createOptionalValidation, validate, vd } from 'utils/validation';
import React, { useState } from "react";

import RadioGroup from "./RadioGroup";

export default {
  title: "RadioGroup",
  component: RadioGroup,
};

function optionMaker(item, index) {
  return {
    label: `option number ${index + 1}`,
    value: (index + 1).toString(),
  };
}

const options = [
  {
    label: "disabled",
    value: "disabled",
    disabled: true,
  },
  ...[...Array(3)].map(optionMaker),
];

const Template = (args: any = {}) => {
  const [selected, setSelected] = useState(args.selected || "1");
  console.log(options);
  return (
    <RadioGroup
      name="test"
      label="test"
      options={options}
      onChange={(e) => setSelected(e.target.value)}
      {...args}
      selected={selected}
    />
  );
};

export const DisabledSelected = Template.bind({});
DisabledSelected.args = {
  selected: "disabled",
};

// export const DisabledOnly = Template.bind({});
// DisabledOnly.args = {
//   selected: "disabled",
// };

//
// export const WithDisabled = () => {
//   return (
//     <div className="m5">
//       <RadioGroup disabled options={options} placeholder="All disabled" />
//     </div>
//   );
// };

// export const WithEvents = () => (
//   <div className="m5">
//     <RadioGroup
//       options={options}
//       placeholder="Events (console)"
//       onChange={newValue => console.log('onChange', newValue)}
//       onClick={() => console.log('onClick')}
//       onKeyPress={() => console.log('onKeyPress')}
//       onEnter={() => console.log('onEnter')}
//       onBlur={() => console.log('onBlur')}
//       onFocus={() => console.log('onFocus')}
//     />
//   </div>
// );
