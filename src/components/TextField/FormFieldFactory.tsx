import React from "react";
import Field, { FieldPublicProps } from "./Field";
import Spinner from "../Spinner";

type InputRef = React.ForwardedRef<HTMLInputElement>;
type FuncRef = (node: HTMLInputElement) => void;

const mergeRefs = (...refs: (InputRef | FuncRef)[]) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (element: HTMLInputElement) => {
    filteredRefs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref) {
        // eslint-disable-next-line
        ref.current = element;
      }
    });
  };
};

export type FormFieldFactoryProps<T> = T & FieldPublicProps;

export default function FormFieldFactory<T>(
  Component: React.FunctionComponent<T>
) {
  return React.forwardRef<HTMLInputElement, FormFieldFactoryProps<T>>(
    function ForwardWrapperRefs(props: FormFieldFactoryProps<T>, forwardedRef) {
      const inputRef = React.useRef<HTMLInputElement>(null);
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

      const { kind, label, ...componentProps } = props;

      return (
        <Field kind={kind} focused={focused} label={label}>
          <Component
            {...((componentProps as unknown) as T)}
            inputRef={mergeRefs(inputRef, forwardedRef)}
          />
        </Field>
      );
    }
  );
}

export type FormFieldStatusProps<T> = T & { pending: boolean };

export function FormFieldStatus<T>(Component: React.FunctionComponent<T>) {
  return function WithStatus({ pending, ...props }: FormFieldStatusProps<T>) {
    return <Component {...props}>{pending && <Spinner size="s" />}</Component>;
  };
}
