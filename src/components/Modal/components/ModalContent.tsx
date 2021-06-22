export interface ModalContentProps {
  flex?: boolean;
  children: React.ReactNode;
}

export default function ModalContent({ children }: ModalContentProps) {
  return <div className="rc-modal__content">{children}</div>;
}
