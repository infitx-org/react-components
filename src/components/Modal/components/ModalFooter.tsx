import classnames from "classnames";
import Button from "components/Button";

type BaseProps = {
  className?: string;
};

interface PropsDriven {
  onSubmit?: () => void;
  isSubmitDisabled?: boolean;
  submitLabel?: string;
  onCancel?: () => void;
  isCancelDisabled?: boolean;
  cancelLabel?: string;
}
interface ChildrenDriven {
  children?: React.ReactNode;
}

export type ModalFooterProps = BaseProps & (PropsDriven | ChildrenDriven);

export function hasFooterProps(
  props: PropsDriven | ChildrenDriven
): props is PropsDriven {
  return (
    (props as PropsDriven).onSubmit !== undefined ||
    (props as PropsDriven).onCancel !== undefined
  );
}

function ModalFooterButtons({
  onSubmit,
  isSubmitDisabled,
  submitLabel,
  onCancel,
  isCancelDisabled,
  cancelLabel,
}: PropsDriven) {
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
