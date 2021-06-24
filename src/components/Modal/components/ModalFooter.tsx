import classnames from "classnames";
import Button from "components/Button";

type BaseFooterProps = {
  className?: string;
};

interface FixedFooterProps {
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  isCancelDisabled?: boolean;
  cancelLabel?: string;
}
interface CustomFooterProps {
  children?: React.ReactNode;
}

export type ModalFooterProps = BaseFooterProps &
  (FixedFooterProps | CustomFooterProps);

export function hasFooterProps(
  props: FixedFooterProps | CustomFooterProps
): props is FixedFooterProps {
  return (
    (props as FixedFooterProps).onSubmit !== undefined ||
    (props as FixedFooterProps).onCancel !== undefined
  );
}

function ModalFooterButtons({
  onSubmit,
  isSubmitDisabled,
  submitLabel,
  onCancel,
  isCancelDisabled,
  cancelLabel,
}: FixedFooterProps) {
  return (
    <div className="rc-modal__footer__buttons">
      {onCancel && (
        <Button
          className="rc-modal__footer__button"
          disabled={isCancelDisabled}
          label={cancelLabel || "Cancel"}
          onClick={onCancel}
          noFill
          kind="danger"
        />
      )}
      {onSubmit && (
        <Button
          className="rc-modal__footer__button"
          disabled={isSubmitDisabled}
          label={submitLabel || "Submit"}
          onClick={onSubmit}
        />
      )}
    </div>
  );
}

export default function ModalFooter({ className, ...props }: ModalFooterProps) {
  let content;
  let common = false;
  if (hasFooterProps(props)) {
    content = <ModalFooterButtons {...props} />;
    common = true;
  } else {
    content = props.children;
  }

  const footerClassName = classnames([
    "rc-modal__footer",
    common && `rc-modal__footer--common`,
    className,
  ]);

  return <div className={footerClassName}>{content}</div>;
}
