import ModalBackground, { ModalBackgroundProps } from "./ModalBackground";
import ModalPortal from "./ModalPortal";
import ModalContent from "./components/ModalContent";
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
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
