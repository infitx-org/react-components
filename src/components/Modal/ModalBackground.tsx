import React, { ReactChild, ReactFragment, ReactPortal } from "react";
import ModalHeader, { ModalHeaderProps } from "./components/ModalHeader";
import ModalFooter from "./components/ModalFooter";
import ModalContent from "./components/ModalContent";

function isHeader(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalHeader;
}

function isContent(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalContent;
}

function isFooter(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalFooter;
}

function isExpectedChild(child: React.ReactNode) {
  return isHeader(child) || isContent(child) || isFooter(child);
}

function getComponents(
  childrenArray: (ReactChild | ReactFragment | ReactPortal)[],
  props: ModalHeaderProps
) {
  const components = childrenArray.map((child) => {
    if (isExpectedChild(child)) {
      return child;
    }
    return <ModalContent>{child}</ModalContent>;
  });

  const hasFooter = components.some(isFooter);
  const hasHeader = components.some(isHeader);
  const hasContent = components.some(isContent);

  if ((!hasHeader && props.title) || props.onClose) {
    components.unshift(<ModalHeader {...props} />);
  }

  return components;
}

interface BaseModalBackgroundProps {
  maximise?: boolean;
  modalIndex?: number;
  children: any;
}
type ModalBackgroundProps = BaseModalBackgroundProps & ModalHeaderProps;

export default function ModalBackground({
  maximise,
  modalIndex = 0,
  children,
  ...props
}: ModalBackgroundProps) {
  const width = 600;
  const maxHeight = maximise
    ? "auto"
    : `calc(100% - ${60 * modalIndex + 70}px)`;

  const modalStyle = {
    top: 50 + 60 * modalIndex,
    bottom: maximise ? "20px" : undefined,
    maxHeight,
    width,
    left: "50%",
    marginLeft: `-${parseInt(width, 10) / 2}px`,
  };

  return (
    <>
      <div
        className="rc-modal__overlay"
        onClick={props.onClose}
        role="presentation"
      />
      <div className="rc-modal__container" style={modalStyle}>
        {getComponents(React.Children.toArray(children), props)}
      </div>
    </>
  );
}
