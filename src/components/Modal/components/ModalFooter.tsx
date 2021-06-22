import Button from "components/Button";

export interface ModalFooterProps {
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
  submitLabel?: string;

  onCancel?: () => void;
  isCancelDisabled?: boolean;
  cancelLabel?: string;

  children?: React.ReactNode;
}
export default function ModalFooter({
  onSubmit,
  isSubmitDisabled,
  submitLabel = "Submit",
  onCancel,
  isCancelDisabled,
  cancelLabel = "Cancel",
  children,
}: ModalFooterProps) {
  return (
    <div className="rc-modal__footer">
      {children}
      <div className="rc-modal__footer-left" />
      <div className="rc-modal__footer-right">
        {onCancel && (
          <Button
            className="rc-modal__footer__button"
            disabled={isCancelDisabled}
            label={cancelLabel}
            onClick={onCancel}
            noFill
            kind="danger"
          />
        )}
        {onSubmit && (
          <Button
            className="rc-modal__footer__button"
            disabled={isSubmitDisabled}
            label={submitLabel}
            onClick={onSubmit}
          />
        )}
      </div>
    </div>
  );
}
