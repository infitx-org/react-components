import React from "react";
import classnames from "classnames";
import ModalHeader, {
  ModalHeaderProps,
  hasHeaderProps,
  FixedHeaderProps,
} from "./components/ModalHeader";
import ModalFooter, {
  ModalFooterProps,
  hasFooterProps,
} from "./components/ModalFooter";
import ModalBody from "./components/ModalBody";

function isHeader(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalHeader;
}

function isContent(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalBody;
}

function isFooter(child: React.ReactNode): boolean {
  return (child as React.ReactElement).type === ModalFooter;
}

function isExpectedChild(child: React.ReactNode) {
  return isHeader(child) || isContent(child) || isFooter(child);
}

function getComponents(
  children: React.ReactNode,
  props: ModalHeaderProps & ModalFooterProps
) {
  const components = React.Children.toArray(children).map((child) => {
    if (isExpectedChild(child)) {
      return child;
    }
    return <ModalBody common>{child}</ModalBody>;
  });

  const hasFooter = components.some(isFooter);
  const hasHeader = components.some(isHeader);

  if (!hasHeader && hasHeaderProps(props)) {
    components.unshift(<ModalHeader {...props} />);
  }

  if (!hasFooter && hasFooterProps(props)) {
    components.push(<ModalFooter {...props} />);
  }

  return components.map((c, key) =>
    // TODO: Find a way to pass down the correcy keys
    // @ts-ignore
    React.cloneElement(c, { ...c.props, key: key.toString() })
  );
}

interface BaseModalBackgroundProps {
  maximise?: boolean;
  modalIndex?: number;
  className?: string;
  children: React.ReactNode;
}
export type ModalBackgroundProps = BaseModalBackgroundProps &
  ModalHeaderProps &
  ModalFooterProps;

export default function ModalBackground({
  maximise,
  modalIndex = 0,
  className,
  children,
  ...props
}: ModalBackgroundProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const { width } = ref.current.getBoundingClientRect();

    ref.current.style.top = `${50 + 60 * modalIndex}px`;
    ref.current.style.opacity = "1";
    ref.current.style.marginLeft = `-${width / 2}px`;
  }, []);

  const containerClassName = classnames([
    "rc-modal",
    maximise && "rc-modal--maximise",
    className,
  ]);

  const onClick = (props as FixedHeaderProps).onClose;

  return (
    <>
      <div
        className="rc-modal__overlay"
        onClick={onClick}
        role="presentation"
      />
      <div className={containerClassName} ref={ref}>
        {getComponents(children, props)}
      </div>
    </>
  );
}
