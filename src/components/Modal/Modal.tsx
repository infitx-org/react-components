import ModalBackground, { ModalBackgroundProps } from "./ModalBackground";
import ModalPortal from "./ModalPortal";
import ModalBody from "./components/ModalBody";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import "./Modal.scss";

export type ModalProps = ModalBackgroundProps & { root?: Element };
function Modal({ root, ...props }: ModalProps) {
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
