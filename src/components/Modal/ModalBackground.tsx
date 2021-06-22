import classnames from "classnames";
import { Kind } from "../../types";
import ModalHeader from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import ModalContent from "./components/ModalContent";

interface ModalBackgroundProps {
  maximise?: boolean;
  modalIndex?: number;
  kind?: `${Kind}`;
  title?: string;
  onClose?: () => void;
  children: any;
}
export default function ModalBackground({
  maximise,
  modalIndex = 0,
  children,
  kind,
  title,
  onClose,
}: ModalBackgroundProps) {
  const width = 600;
  const maxHeight = maximise
    ? "auto"
    : `calc(100% - ${60 * modalIndex + 70}px)`;
  const bottom = maximise ? "20px" : undefined;
  const modalStyle = {
    top: 50 + 60 * modalIndex,
    bottom,
    maxHeight,
    width,
    left: "50%",
    marginLeft: `-${parseInt(width, 10) / 2}px`,
  };
  const customStyle = {
    background: modalIndex > 0 ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.7)",
  };

  const showHeader = title || onClose;

  return (
    <>
      <div
        className="rc-modal__overlay"
        style={customStyle}
        onClick={onClose}
        role="presentation"
      />
      <div className="rc-modal__container" style={modalStyle}>
        {showHeader && (
          <ModalHeader kind={kind} title={title} onClose={onClose} />
        )}
        {children}
      </div>
    </>
  );
}
