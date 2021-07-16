/* eslint no-console: "off" */
import { useState } from "react";
import { Kind } from "types";
import Select from "components/Select";
import Button from "components/Button";
import Modal from "./Modal";

export default {
  title: "components/Modal",
  component: Modal,
  subcomponents: {
    "Modal.Header": Modal.Header,
    "Modal.Body": Modal.Body,
    "Modal.Footer": Modal.Footer,
  },
};

const { log } = console;

export const Simple = () => (
  <Modal title="I am a modal" onClose={log} onCancel={log} onSubmit={log}>
    <div style={{ width: "200px" }}>Body!</div>
  </Modal>
);

export const SpecifyComponents = () => (
  <Modal>
    <Modal.Header>Custom Header</Modal.Header>
    <Modal.Body>Custom Body</Modal.Body>
    <Modal.Footer>Custom Footer</Modal.Footer>
  </Modal>
);

export const Maximise = () => {
  return (
    <Modal title="test" onClose={log} maximise onSubmit={log}>
      <div style={{ width: "300px", height: "2000px", background: "#f00" }} />
    </Modal>
  );
};

export const NoFooterAndNoHeader = () => <Modal>test</Modal>;

export const Kinds = () => {
  const [kind, setKind] = useState<Kind | undefined>(undefined);

  return (
    <Modal kind={kind} onClose={log} title={kind}>
      <Modal.Body style={{ padding: "20px" }}>
        <Select
          options={Object.entries(Kind).map(([label, value]) => ({
            label,
            value,
          }))}
          onChange={(k) => setKind(k as Kind)}
        />
      </Modal.Body>
    </Modal>
  );
};

export const ModalInModal = () => {
  const [open, setOpen] = useState<boolean>(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  return (
    <Modal title="Parent Modal">
      <Button onClick={openModal} label="Open modal!" />
      {open && (
        <Modal title="Child modal" onClose={closeModal}>
          Close me and get back to the parent modal!
        </Modal>
      )}
    </Modal>
  );
};
