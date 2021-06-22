export interface ModalFooterProps {
  children: React.ReactNode;
}
export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="rc-modal__footer">
      <div className="rc-modal__footer-left" />
      <div className="rc-modal__footer-right">{children}</div>
    </div>
  );
}
