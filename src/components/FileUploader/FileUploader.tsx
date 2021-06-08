import React from "react";
import classnames from "classnames";
import { Kind, InputSize, KeyCode } from "types";
import readFileAsText from "@modusbox/ts-utils/lib/file/readFileAsText";
import readFileAsBase64 from "@modusbox/ts-utils/lib/file/readFileAsBase64";
import Field, {
  Loader,
  Placeholder,
  InvalidIcon,
  ValidationProps,
} from "components/Field";
import Button from "components/Button";
import { BaseInput } from "components/shared/types";
import "./FileUploader.scss";

export interface BaseFileUploaderProps extends BaseInput {
  kind?: `${Kind}`;
  size?: `${InputSize}`;
  className?: string;
  parseAs?: "text" | "base64";
  placeholder?: string;
  file?: File;
  fileName?: string;
  required?: boolean;
  invalid?: boolean;
  pending?: boolean;
  onChange?: (content?: string) => void;
}

export type FileUploaderProps = BaseFileUploaderProps & ValidationProps;

export default React.forwardRef(function FileUploader(
  {
    kind = Kind.Primary,
    size = InputSize.Large,
    className,
    parseAs = "text",
    placeholder,
    file,
    fileName,
    required,
    invalid,
    pending,
    onChange,
    ...props
  }: FileUploaderProps,
  forwardedRef: React.ForwardedRef<HTMLDivElement>
): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedFile, setFile] = React.useState<File | undefined>(file);
  const [selectedFileName, setFileName] = React.useState<string | undefined>(
    fileName || file?.name
  );
  const [open, setOpen] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  React.useEffect(() => {
    setFile(file);
  }, [file]);

  React.useEffect(() => {
    if (!selectedFile && selectedFileName) {
      setFileName(fileName);
    }
  }, [fileName]);

  function enter() {
    setFocused(true);
    setOpen(true);
    inputRef.current?.focus();
  }

  function leave() {
    setFocused(false);
    setOpen(false);
  }

  function onChooseFileButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    inputRef.current?.click();
  }
  function onRemoveFileButtonClick() {
    setFile(undefined);
    setFileName(undefined);
    onChange?.(undefined);
  }

  async function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const inputFile = e.target.files?.item(0);
    if (!inputFile) {
      return;
    }
    let parse;
    if (parseAs === "text") {
      parse = readFileAsText;
    } else {
      parse = readFileAsBase64;
    }
    const content = await parse(inputFile);
    setFile(inputFile);
    setFileName(inputFile.name);
    onChange?.(content as string);
    inputRef.current?.focus();
  }

  function onFocus(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onFocus?.(e);
      enter();
    }
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement>) {
    if (!focused) {
      props.onBlur?.(e);
    }
  }

  function onFieldClick(e: React.MouseEvent<HTMLDivElement>): void {
    if (e.target !== inputRef.current) {
      e.preventDefault();
      e.stopPropagation();
      if (open) {
        leave();
      } else {
        enter();
      }
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const { keyCode } = e;

    if (keyCode === KeyCode.Tab) {
      leave();
      return;
    }
    if (keyCode === KeyCode.Return) {
      e.preventDefault();
      if (selectedFileName) {
        onRemoveFileButtonClick();
      } else {
        inputRef.current?.click();
      }
    }
  }

  const button = (
    <Button
      noFill={!focused}
      tabIndex={-1}
      size="extra-small"
      label={selectedFileName ? "Remove File" : "Choose File"}
      onClick={
        selectedFileName ? onRemoveFileButtonClick : onChooseFileButtonClick
      }
      kind={selectedFileName ? "danger" : "primary"}
    />
  );

  const fileNameClassName = classnames([
    "rc-fileuploader",
    `rc-fileuploader--${size}`,
  ]);

  return (
    <Field
      className={className}
      kind={kind}
      size={size}
      required={required && selectedFile === undefined}
      invalid={invalid}
      disabled={props.disabled}
      focused={focused}
      onClick={onFieldClick}
      onClickOutside={leave}
      ref={forwardedRef}
      validation={props.validation}
    >
      {placeholder && (
        <Placeholder
          label={placeholder}
          active={!!selectedFile || focused}
          size={size}
        />
      )}
      <input
        {...props}
        className="rc-fileuploader__input"
        type="file"
        ref={inputRef}
        onChange={onFileChange}
        onFocus={onFocus}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
      />
      <div className={fileNameClassName}>{selectedFileName}</div>
      {pending && <Loader size={size} />}
      {invalid && <InvalidIcon size={size} />}
      {button}
    </Field>
  );
});
