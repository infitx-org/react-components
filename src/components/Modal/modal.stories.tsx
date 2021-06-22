/* eslint no-console: "off" */
// import Button from "../Button";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Simple = () => (
  <Modal title="I am a modal" onClose={console.log}>
    Content!
  </Modal>
);

export const SpecifyComponents = () => (
  <Modal>
    <Modal.Header>Hello There!</Modal.Header>
    <Modal.Content>test</Modal.Content>
    <Modal.Footer>test</Modal.Footer>
  </Modal>
);

export const Maximise = () => (
  <Modal title="test" onClose={console.log} maximise>
    <Modal.Content>test</Modal.Content>
    <Modal.Footer>test</Modal.Footer>
  </Modal>
);

export const NoFooter = () => (
  <Modal title="test" onClose={console.log}>
    test
  </Modal>
);
