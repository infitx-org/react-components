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
    "Modal.Content": Modal.Content,
    "Modal.Footer": Modal.Footer,
  },
};

const { log } = console;

export const Simple = () => (
  <Modal title="I am a modal" onClose={log} onCancel={log} onSubmit={log}>
    Content!
  </Modal>
);

export const SpecifyComponents = () => (
  <Modal>
    <Modal.Header title="test" />
    <Modal.Content>Custom content</Modal.Content>
    <Modal.Footer>Custom footer content</Modal.Footer>
  </Modal>
);

export const Maximise = () => (
  <Modal title="test" onClose={log} maximise>
    Content is Maximized
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
