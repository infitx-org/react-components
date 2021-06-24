import ModalBackground, { ModalBackgroundProps } from "./ModalBackground";
import ModalPortal from "./ModalPortal";
import ModalBody from "./components/ModalBody";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import "./Modal.scss";

function Modal({ root, ...props }: ModalBackgroundProps & { root?: Element }) {
  return (
    <ModalPortal root={root}>
      <ModalBackground {...props} />
    </ModalPortal>
  );
}

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
