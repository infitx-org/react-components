/* eslint no-console: "off" */
import React, { useState } from "react";

// import Button from "../Button";
import Modal from "./Modal";

export default {
  title: "Modal",
  component: Modal,
};

export const Default = () => (
  <Modal title="test" onClose={console.log}>
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
