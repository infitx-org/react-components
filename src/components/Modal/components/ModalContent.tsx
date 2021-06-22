export interface ModalContentProps {
  flex?: boolean;
  children: React.ReactNode;
}

export default function ModalContent({ flex, children }: ModalContentProps) {
  return <div className="rc-modal__body">{children}</div>;
}
