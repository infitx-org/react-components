import React from "react";
import classnames from "classnames";
import { Kind, Size } from "../types";
import mergeRefs from "../utils/mergeRefs";
import "./Field.scss";

function useFocus(inputRef: React.RefObject<HTMLInputElement>): [boolean] {
  const [focused, setFocused] = React.useState(false);
  const setFocus = () => setFocused(true);
  const unsetFocus = () => setFocused(false);

  React.useEffect(() => {
    inputRef.current?.addEventListener("focus", setFocus);
    inputRef.current?.addEventListener("blur", unsetFocus);
    return () => {
      inputRef.current?.removeEventListener("focus", setFocus);
      inputRef.current?.removeEventListener("blur", unsetFocus);
    };
  }, [inputRef.current]);
  return [focused];
}

function useValue(
  inputRef: React.RefObject<HTMLInputElement>
): [string | undefined] {
  const [value, setValue] = React.useState("");
  const setInnerValue = (e) => setValue(e.target.value);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.addEventListener("keyup", setInnerValue);
      setValue(inputRef.current.value);
    }
    return () => {
      inputRef.current?.removeEventListener("keyup", setInnerValue);
    };
  }, [inputRef.current]);
  return [value];
}

export interface FieldProps {
  kind?: `${Kind}`;
  size?: Size;
  label?: string;
  required?: boolean;
  pending?: boolean;
  component: React.ReactElement<HTMLInputElement>;
  disabled: boolean;
  children?: React.ReactNode;
}

export default function Field({
  kind = Kind.Primary,
  size = Size.Large,
  label,
  disabled,
  required,
  pending,
  component,
  children,
}: FieldProps): JSX.Element {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [focused] = useFocus(inputRef);
  const [innerValue] = useValue(inputRef);

  function hasValue(v: string | undefined) {
    return v !== undefined && v !== "";
  }

  function focusOnClick() {
    inputRef.current?.focus();
  }

  const fieldClassname = classnames([
    "field",
    kind && `field--${kind}`,
    "mb-input",
    "mb-input__borders",
    "mb-input__background",
    "mb-input__shadow",
    size === Size.Small && "mb-input--small",
    size === Size.Medium && "mb-input--medium",
    size === Size.Large && "mb-input--large",
    focused &&
      "mb-input--open mb-input__borders--open mb-input__background--open mb-input__shadow--open",
    disabled &&
      "mb-input--disabled mb-input__borders--disabled mb-input__background--disabled",
    pending &&
      "mb-input--pending mb-input__borders--pending mb-input__background--pending mb-input__shadow--pending",
    // invalid &&
    //   "mb-input--invalid mb-input__borders--invalid mb-input__background--invalid mb-input__shadow--invalid",
    required &&
      !hasValue(innerValue) &&
      "mb-input--required mb-input__borders--required mb-input__background--required mb-input__shadow--required",
  ]);

  // @ts-ignore
  const wrapped = React.cloneElement(component, {
    ...component.props,
    // @ts-ignore
    ref: mergeRefs(component.ref, inputRef),
  });

  return (
    <>
      {label && <label>{label}</label>}
      <div
        className={fieldClassname}
        onClick={focusOnClick}
        role="presentation"
      >
        {wrapped}
        {children}
      </div>
    </>
  );
}
