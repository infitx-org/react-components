import FileUploader from "./FileUploader";

export default {
  title: "Components/FileUploader",
};

/* eslint-disable no-console */

const file = new File([new Blob(["test"], { type: "text/plain" })], "test");
const Template = (args) => <FileUploader {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "large",
  file,
  className: undefined,
  placeholder: "Choose a file",
  required: false,
  invalid: false,
  pending: false,
  onChange: console.log,
};

export const SelectedFile = Template.bind({});
SelectedFile.args = {
  file,
};
export const SelectedFileName = Template.bind({});
SelectedFileName.args = {
  fileName: "myfile.dat",
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const Placeholder = Template.bind({});
Placeholder.args = {
  placeholder: "Pick a file",
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
