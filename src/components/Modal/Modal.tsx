import { Kind } from "../../types";
import ModalBackground from "./ModalBackground";
import ModalPortal from "./ModalPortal";
import ModalContent from "./components/ModalContent";
import ModalFooter from "./components/ModalFooter";
import ModalHeader from "./components/ModalHeader";
import "./Modal.scss";

interface ModalProps {
  title?: string;
  kind?: `${Kind}`;
  flex?: boolean;
  tabbed?: boolean;
  maximise?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

function Modal(props: ModalProps) {
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
