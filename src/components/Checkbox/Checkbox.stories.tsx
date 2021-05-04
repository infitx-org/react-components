/* eslint no-alert: "off" */
/* eslint no-console: "off" */
/* eslint no-console: "off" */
import React from "react";
import Checkbox from "./Checkbox";

const Column = ({ children }) => (
  <div style={{ justifyContent: "space-between" }}>{children}</div>
);

export default {
  title: "Checkbox",
  component: Checkbox,
};

export const Default = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        id="test"
        name="test"
        checked={false}
        onChange={(e) => console.log(e.target.checked)}
      />
    </div>
    <div className="m5">
      <Checkbox id="test1" name="test1" label="Default Checkbox" checked />
    </div>
    <div className="m5">
      <Checkbox
        id="test2"
        name="test2"
        label="Default Checkbox"
        checked={false}
      />
    </div>
    <div className="m5">
      <Checkbox
        id="test3"
        name="test3"
        label="Default Checkbox"
        checked={false}
        round
      />
    </div>
    <div className="m5">
      <Checkbox
        id="test4"
        name="test4"
        label="Default Checkbox"
        checked={false}
        semi
      />
    </div>
  </Column>
);

export const SemiChecked = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        name="test"
        label="Semi Checked Checkbox"
        checked={false}
        semi
      />
    </div>
    <div className="m5">
      <Checkbox name="test" label="Semi Checked Checkbox" checked semi />
    </div>
  </Column>
);

export const Round = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox name="test" label="Round Checkbox" checked={false} round />
    </div>
    <div className="m5">
      <Checkbox name="test" label="Round Checkbox" checked round />
    </div>
  </Column>
);

export const Disabled = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        name="test"
        label="Disabled Checkbox"
        checked={false}
        disabled
      />
    </div>
    <div className="m5">
      <Checkbox name="test" label="Disabled Checkbox" checked disabled />
    </div>
  </Column>
);

export const OnChange = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        name="test"
        label="onChange event Checkbox"
        checked={false}
        onChange={console.log}
      />
    </div>
    <div className="m5">
      <Checkbox
        name="test"
        label="onChange event Checkbox"
        checked
        onChange={console.log}
      />
    </div>
  </Column>
);

export const OnFocus = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        name="test"
        label="onFocus event Checkbox"
        checked={false}
        onFocus={console.log}
      />
    </div>
    <div className="m5">
      <Checkbox
        name="test"
        label="onFocus event Checkbox"
        checked
        onFocus={console.log}
      />
    </div>
  </Column>
);

export const OnBlur = () => (
  <Column align="space-between">
    <div className="m5">
      <Checkbox
        name="test"
        label="onBlur event Checkbox"
        checked={false}
        onBlur={console.log}
      />
    </div>
    <div className="m5">
      <Checkbox
        name="test"
        label="onBlur event Checkbox"
        checked
        onBlur={console.log}
      />
    </div>
  </Column>
);
