/* eslint no-console: "off" */
// import Button from "../Button";
import { useState } from "react";
import { Kind } from "types";
import Select from "components/Select";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

const { log } = console;

export const Simple = () => (
  <Modal title="I am a modal" onClose={log} onCancel={log} onSubmit={log}>
    Content!
  </Modal>
);

export const SpecifyComponents = () => (
  <Modal>
    <Modal.Header>Custom header content</Modal.Header>
    <Modal.Content>Custom content</Modal.Content>
    <Modal.Footer>Custom footer content</Modal.Footer>
  </Modal>
);

export const Maximise = () => (
  <Modal title="test" onClose={log} maximise>
    <Modal.Content>test</Modal.Content>
    <Modal.Footer>test</Modal.Footer>
  </Modal>
);

export const NoFooterAndNoHeader = () => <Modal>test</Modal>;

export const Kinds = () => {
  const [kind, setKind] = useState<Kind | undefined>(undefined);

  return (
    <Modal kind={kind} onClose={log} title={kind}>
      <Modal.Content style={{ padding: "20px" }}>
        <Select
          options={Object.entries(Kind).map(([label, value]) => ({
            label,
            value,
          }))}
          onChange={(k) => setKind(k as Kind)}
        />
      </Modal.Content>
    </Modal>
  );
};
