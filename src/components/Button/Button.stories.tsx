/* eslint no-console: "off" */
import { Size } from "types";
import Row from "components/Layout/Row";
import Button from "./Button";

export default {
  title: "Button",
  component: Button,
};

const { log } = console;

const icon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="55"
    height="55"
    viewBox="-6 -3 55 55"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 1.5C3 0.671387 2.32837 0 1.5 0C0.671631 0 0 0.671387 0 1.5V10C0 10.8286 0.671631 11.5 1.5 11.5C2.32837 11.5 3 10.8286 3 10V7.09766C8.06763 7.09766 11.5435 8.36572 14.2627 10.1763C16.3403 11.5596 18.0134 13.2783 19.655 15.1367C18.0134 16.9951 16.3403 18.7139 14.2627 20.0972C11.5435 21.9077 8.06763 23.1758 3 23.1758V20C3 19.1714 2.32837 18.5 1.5 18.5C0.671631 18.5 0 19.1714 0 20V28.5C0 29.3286 0.671631 30 1.5 30C2.32837 30 3 29.3286 3 28.5V26.1758C8.62988 26.1758 12.6897 24.7485 15.9255 22.5942C18.1782 21.0942 20 19.2573 21.6365 17.4248C23.7202 19.8335 25.988 22.3193 29.0637 24.0439C31.5371 25.4312 34.4624 26.2915 38.144 26.356L37.6528 26.8604L37.3909 27.1294L37.3206 27.2017L37.3022 27.2207L37.2961 27.2271C37.1597 27.3672 37.0562 27.5273 36.9854 27.6978C36.9429 27.8003 36.9121 27.9062 36.8933 28.0137C36.8108 28.4854 36.9551 28.9888 37.3242 29.3481C37.9177 29.9258 38.8674 29.9136 39.4453 29.3198L38.3706 28.2734L39.447 29.3184L39.4517 29.3135L39.4697 29.2949L39.5403 29.2227L39.802 28.9536L40.6902 28.0415L42.9661 25.7041C43.5332 25.1221 43.5332 24.1938 42.9661 23.6113L40.6902 21.2739L39.802 20.3623L39.5403 20.0933L39.4697 20.021L39.4517 20.0024L39.4453 19.9961C38.8674 19.4023 37.9177 19.3896 37.3242 19.9678C36.7307 20.5454 36.718 21.4951 37.2961 22.0889L38.3706 21.0425L37.2976 22.0903L37.3022 22.0952L37.3206 22.1138L37.3909 22.186L37.6528 22.4551L38.5339 23.3604C35.1289 23.3521 32.5955 22.585 30.531 21.4272C27.8311 19.9136 25.8076 17.6699 23.6248 15.1367C25.8076 12.6035 27.8311 10.3599 30.531 8.84619C32.5955 7.68848 35.1289 6.92139 38.5339 6.91309L37.6528 7.81836L37.3909 8.0874L37.3206 8.15967L37.3022 8.17822L37.2976 8.18311L38.3706 9.23096L37.2961 8.18457C36.718 8.77832 36.7307 9.72803 37.3242 10.3057C37.9177 10.8838 38.8674 10.8711 39.4453 10.2773L39.4517 10.271L39.4697 10.2524L39.5403 10.1802L39.802 9.91113L40.6902 8.99951L42.9661 6.66211C43.5332 6.07959 43.5332 5.15137 42.9661 4.56934L40.6902 2.23193L39.802 1.31982L39.5403 1.05078L39.4697 0.978516L39.4517 0.959961L39.447 0.955078L38.3706 2L39.4453 0.953613C38.8674 0.359863 37.9177 0.347656 37.3242 0.925293C36.7307 1.50342 36.718 2.45312 37.2961 3.04639L37.3022 3.05273L37.3206 3.07178L37.3909 3.14404L37.6528 3.41309L38.144 3.91748C34.4624 3.98193 31.5371 4.84229 29.0637 6.22949C25.988 7.9541 23.7202 10.4399 21.6365 12.8486C20 11.0161 18.1782 9.1792 15.9255 7.6792C12.6897 5.5249 8.62988 4.09766 3 4.09766V1.5ZM37.4329 38.6943C36.8394 39.2725 36.8267 40.2222 37.4048 40.8154L37.4109 40.8218L37.4292 40.8408L37.4995 40.9131L37.7615 41.1821L38.4458 41.8848H3.45508C3.29639 41.8848 3.14355 41.9097 3 41.9551V39C3 38.1714 2.32837 37.5 1.5 37.5C0.671631 37.5 0 38.1714 0 39V47.5C0 48.3286 0.671631 49 1.5 49C2.32837 49 3 48.3286 3 47.5V44.8145C3.14355 44.8604 3.29639 44.8848 3.45508 44.8848H38.4458L37.4048 45.9536C36.8267 46.5474 36.8394 47.4971 37.4329 48.0747C38.0264 48.6528 38.9761 48.6401 39.554 48.0464L43.0747 44.4312C43.6418 43.8486 43.6418 42.9204 43.0747 42.3379L40.7988 40.001L39.9109 39.0889L39.6489 38.8198L39.5784 38.7476L39.5603 38.729L39.5557 38.7241L38.4792 39.769L39.554 38.7227C38.9761 38.1289 38.0264 38.1162 37.4329 38.6943Z"
    />
  </svg>
);

export const defaultButton = () => (
  <Button onClick={log} label="Primary" kind="primary" />
);

export const AllKinds = () => (
  <Row align="center space-between">
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
  <Row align="center space-between">
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
  <Row align="center space-between">
    <Button onClick={log} icon={icon} label="Primary" kind="primary" />
    <Button onClick={log} icon={icon} label="Secondary" kind="secondary" />
    <Button onClick={log} icon={icon} label="Tertiary" kind="tertiary" />
    <Button onClick={log} icon={icon} label="Success" kind="success" />
    <Button onClick={log} icon={icon} label="Danger" kind="danger" />
    <Button onClick={log} icon={icon} label="Warning" kind="warning" />
    <Button onClick={log} icon={icon} label="Dark" kind="dark" />
    <Button onClick={log} icon={icon} label="Light" kind="light" />
  </Row>
);

export const AllKindsWithNoFillWithIcon = () => (
  <Row align="center space-between">
    <Button onClick={log} noFill icon={icon} label="Primary" kind="primary" />
    <Button
      onClick={log}
      noFill
      icon={icon}
      label="Secondary"
      kind="secondary"
    />
    <Button onClick={log} noFill icon={icon} label="Tertiary" kind="tertiary" />
    <Button onClick={log} noFill icon={icon} label="Success" kind="success" />
    <Button onClick={log} noFill icon={icon} label="Danger" kind="danger" />
    <Button onClick={log} noFill icon={icon} label="Warning" kind="warning" />
    <Button onClick={log} noFill icon={icon} label="Dark" kind="dark" />
    <Button onClick={log} noFill icon={icon} label="Light" kind="light" />
  </Row>
);

export const AllPending = () => (
  <Row align="center space-between">
    <Button onClick={log} label="Primary" kind="primary" pending />
    <Button onClick={log} label="Secondary" kind="secondary" pending />
    <Button onClick={log} label="Tertiary" kind="tertiary" pending />
    <Button onClick={log} label="Success" kind="success" pending />
    <Button onClick={log} label="Danger" kind="danger" pending />
    <Button onClick={log} label="Warning" kind="warning" pending />
    <Button onClick={log} label="Dark" kind="dark" pending />
    <Button onClick={log} label="Light" kind="light" pending />
    <Button onClick={log} label="Disabled" disabled pending />
    <Button onClick={log} label="Icon" icon={icon} pending />
  </Row>
);

export const AllPendingWithNoFill = () => (
  <Row align="center space-between">
    <Button onClick={log} noFill label="Primary" kind="primary" pending />
    <Button onClick={log} noFill label="Secondary" kind="secondary" pending />
    <Button onClick={log} noFill label="Tertiary" kind="tertiary" pending />
    <Button onClick={log} noFill label="Success" kind="success" pending />
    <Button onClick={log} noFill label="Danger" kind="danger" pending />
    <Button onClick={log} noFill label="Warning" kind="warning" pending />
    <Button onClick={log} noFill label="Dark" kind="dark" pending />
    <Button onClick={log} noFill label="Light" kind="light" pending />
    <Button onClick={log} noFill label="Disabled" disabled pending />
    <Button onClick={log} noFill label="Icon" icon={icon} pending />
  </Row>
);

export const AllDisabled = () => (
  <Row align="center space-between">
    <Button onClick={log} label="Primary" kind="primary" disabled />
    <Button onClick={log} label="Secondary" kind="secondary" disabled />
    <Button onClick={log} label="Tertiary" kind="tertiary" disabled />
    <Button onClick={log} label="Success" kind="success" disabled />
    <Button onClick={log} label="Danger" kind="danger" disabled />
    <Button onClick={log} label="Warning" kind="warning" disabled />
    <Button onClick={log} label="Dark" kind="dark" disabled />
    <Button onClick={log} label="Pending" pending disabled />
    <Button onClick={log} label="Icon" icon={icon} disabled />
    <Button onClick={log} label="No Fill" icon={icon} noFill disabled />
    <Button
      onClick={log}
      label="No Fill"
      icon={icon}
      noFill
      kind="secondary"
      disabled
    />
    <Button
      onClick={log}
      label="No Fill"
      icon={icon}
      noFill
      kind="tertiary"
      disabled
    />
    <Button
      onClick={log}
      label="No Fill"
      icon={icon}
      noFill
      kind="danger"
      disabled
    />
  </Row>
);

export const AllSizes = () => (
  <div>
    <Row align="center space-between">
      <Button onClick={log} label="Large size " size={Size.Large} />
      <Button onClick={log} label="Medium size " size={Size.Medium} />
      <Button onClick={log} label="Small size " size={Size.Small} />
      <Button
        onClick={log}
        label="Large size and icon"
        icon={icon}
        size={Size.Large}
      />
      <Button
        onClick={log}
        label="Medium size and icon"
        icon={icon}
        size={Size.Medium}
      />
      <Button
        onClick={log}
        label="Small size and icon"
        icon={icon}
        size={Size.Small}
      />
    </Row>
    <Row align="center space-between">
      <Button
        onClick={log}
        label="Large size pending "
        pending
        size={Size.Large}
      />
      <Button
        onClick={log}
        label="Medium size pending "
        pending
        size={Size.Medium}
      />
      <Button
        onClick={log}
        label="Small size pending "
        pending
        size={Size.Small}
      />
    </Row>
  </div>
);

export const WithTooltip = () => (
  <Row align="center space-between">
    <Button onClick={log} label="Test Button Tooltip" tooltip="Test!" />
  </Row>
);

export const WithIcon = () => (
  <Row align="center space-between">
    <Button
      onClick={log}
      label="Test Button Tooltip"
      icon={
        <div style={{ width: "20px", height: "20px", background: "#f00" }} />
      }
    />
  </Row>
);

export const WithSVGIcon = () => (
  <Row align="center space-between">
    <Button onClick={log} label="Test Button Tooltip" icon={icon} />
  </Row>
);
