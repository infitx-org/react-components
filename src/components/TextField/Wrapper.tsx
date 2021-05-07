import React from "react";
import Field, { FieldPublicProps } from "./Field";

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

export default function Wrapper<T>(Component: React.FunctionComponent<T>) {
  // const ComponentWithForwardedRefs = React.forwardRef<HTMLInputElement, T>(
  //   (props, ref) => <Component {...props} inputRef={ref} />
  // );

  return React.forwardRef<HTMLInputElement, WrapperProps<T>>(
    function ForwardWrapperRefs(props: WrapperProps<T>, forwardedRef) {
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

      return (
        <Field kind={props.kind} focused={focused} label={props.label}>
          <Component
            {...(props as T)}
            inputRef={mergeRefs(inputRef, forwardedRef)}
          />
        </Field>
      );
    }
  );
}

export type WrapperProps<T> = T & FieldPublicProps;
