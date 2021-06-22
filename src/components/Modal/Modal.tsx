import ModalBackground, { ModalBackgroundProps } from "./ModalBackground";
import ModalPortal from "./ModalPortal";
import ModalContent from "./components/ModalContent";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import "./Modal.scss";

function Modal(props: ModalBackgroundProps) {
  return (
    <ModalPortal>
      <ModalBackground {...props} />
    </ModalPortal>
  );
}

Modal.Header = ModalHeader;
Modal.Content = ModalContent;
Modal.Footer = ModalFooter;

export default Modal;
