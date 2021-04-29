/* eslint no-console: "off" */
import React from "react";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const { log } = console;
function Row({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {children}
    </div>
  );
}

export const defaultButton = () => (
  <Button onClick={log} label="Primary" kind="primary" />
);

export const AllKinds = () => (
  <Row>
    <Button onClick={log} label="Primary" kind="primary" />
    <Button onClick={log} label="Secondary" kind="secondary" />
    <Button onClick={log} label="Tertiary" kind="tertiary" />
    <Button onClick={log} label="Success" kind="success" />
    <Button onClick={log} label="Danger" kind="danger" />
    <Button onClick={log} label="Warning" kind="warning" />
    <Button onClick={log} label="Dark" kind="dark" />
    <Button onClick={log} label="Light" kind="light" />
  </Row>
);

export const AllKindsWithNoFill = () => (
  <Row>
    <Button onClick={log} noFill label="Primary" kind="primary" />
    <Button onClick={log} noFill label="Secondary" kind="secondary" />
    <Button onClick={log} noFill label="Tertiary" kind="tertiary" />
    <Button onClick={log} noFill label="Success" kind="success" />
    <Button onClick={log} noFill label="Danger" kind="danger" />
    <Button onClick={log} noFill label="Warning" kind="warning" />
    <Button onClick={log} noFill label="Dark" kind="dark" />
    <Button onClick={log} noFill label="Light" kind="light" />
  </Row>
);

export const AllKindsWithIcon = () => (
  <Row>
    <Button onClick={log} icon="deploy-small" label="Primary" kind="primary" />
    <Button
      onClick={log}
      icon="deploy-small"
      label="Secondary"
      kind="secondary"
    />
    <Button
      onClick={log}
      icon="deploy-small"
      label="Tertiary"
      kind="tertiary"
    />
    <Button onClick={log} icon="deploy-small" label="Success" kind="success" />
    <Button onClick={log} icon="deploy-small" label="Danger" kind="danger" />
    <Button onClick={log} icon="deploy-small" label="Warning" kind="warning" />
    <Button onClick={log} icon="deploy-small" label="Dark" kind="dark" />
    <Button onClick={log} icon="deploy-small" label="Light" kind="light" />
  </Row>
);

export const AllKindsWithNoFillWithIcon = () => (
  <Row>
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Primary"
      kind="primary"
    />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Secondary"
      kind="secondary"
    />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Tertiary"
      kind="tertiary"
    />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Success"
      kind="success"
    />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Danger"
      kind="danger"
    />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Warning"
      kind="warning"
    />
    <Button onClick={log} noFill icon="deploy-small" label="Dark" kind="dark" />
    <Button
      onClick={log}
      noFill
      icon="deploy-small"
      label="Light"
      kind="light"
    />
  </Row>
);

export const AllPending = () => (
  <Row>
    <Button onClick={log} label="Primary" kind="primary" pending />
    <Button onClick={log} label="Secondary" kind="secondary" pending />
    <Button onClick={log} label="Tertiary" kind="tertiary" pending />
    <Button onClick={log} label="Success" kind="success" pending />
    <Button onClick={log} label="Danger" kind="danger" pending />
    <Button onClick={log} label="Warning" kind="warning" pending />
    <Button onClick={log} label="Dark" kind="dark" pending />
    <Button onClick={log} label="Light" kind="light" pending />
    <Button onClick={log} label="Disabled" disabled pending />
    <Button onClick={log} label="Icon" icon="deploy-small" pending />
  </Row>
);

export const AllPendingWithNoFill = () => (
  <Row>
    <Button onClick={log} noFill label="Primary" kind="primary" pending />
    <Button onClick={log} noFill label="Secondary" kind="secondary" pending />
    <Button onClick={log} noFill label="Tertiary" kind="tertiary" pending />
    <Button onClick={log} noFill label="Success" kind="success" pending />
    <Button onClick={log} noFill label="Danger" kind="danger" pending />
    <Button onClick={log} noFill label="Warning" kind="warning" pending />
    <Button onClick={log} noFill label="Dark" kind="dark" pending />
    <Button onClick={log} noFill label="Light" kind="light" pending />
    <Button onClick={log} noFill label="Disabled" disabled pending />
    <Button onClick={log} noFill label="Icon" icon="deploy-small" pending />
  </Row>
);

export const AllDisabled = () => (
  <Row>
    <Button onClick={log} label="Primary" kind="primary" disabled />
    <Button onClick={log} label="Secondary" kind="secondary" disabled />
    <Button onClick={log} label="Tertiary" kind="tertiary" disabled />
    <Button onClick={log} label="Success" kind="success" disabled />
    <Button onClick={log} label="Danger" kind="danger" disabled />
    <Button onClick={log} label="Warning" kind="warning" disabled />
    <Button onClick={log} label="Dark" kind="dark" disabled />
    <Button onClick={log} label="Pending" pending disabled />
    <Button onClick={log} label="Icon" icon="deploy-small" disabled />
    <Button onClick={log} label="No Fill" icon="deploy-small" noFill disabled />
    <Button
      onClick={log}
      label="No Fill"
      icon="deploy-small"
      noFill
      kind="secondary"
      disabled
    />
    <Button
      onClick={log}
      label="No Fill"
      icon="deploy-small"
      noFill
      kind="tertiary"
      disabled
    />
    <Button
      onClick={log}
      label="No Fill"
      icon="deploy-small"
      noFill
      kind="danger"
      disabled
    />
  </Row>
);

export const AllSizes = () => (
  <div>
    <Row>
      <Button onClick={log} label="Large size " size="l" />
      <Button onClick={log} label="Medium size " size="m" />
      <Button onClick={log} label="Small size " size="s" />
      <Button
        onClick={log}
        label="Large size and icon"
        icon="deploy-small"
        size="l"
      />
      <Button
        onClick={log}
        label="Medium size and icon"
        icon="deploy-small"
        size="m"
      />
      <Button
        onClick={log}
        label="Small size and icon"
        icon="deploy-small"
        size="s"
      />
    </Row>
    <Row>
      <Button onClick={log} label="Large size pending " pending size="l" />
      <Button onClick={log} label="Medium size pending " pending size="m" />
      <Button onClick={log} label="Small size pending " pending size="s" />
    </Row>
  </div>
);

export const WithTooltip = () => (
  <Row>
    <Button onClick={log} label="Test Button Tooltip" tooltip="Test!" />
  </Row>
);
