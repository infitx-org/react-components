import React, { ChangeEvent } from "react";
import Field, { FieldPublicProps } from "./Field";
import Spinner from "../Spinner";

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

function useRequired(
  inputRef: React.RefObject<HTMLInputElement>,
  required: boolean | undefined
) {
  const test = (value?: string) => {
    return required === true && (value === "" || value === undefined);
  };
  const [isRequired, setRequired] = React.useState(
    test(inputRef?.current?.value)
  );

  const setOnChange = (e: any) => {
    setRequired(e?.target?.value);
  };

  React.useEffect(() => {
    inputRef.current?.addEventListener("keyup", setOnChange);
    return () => {
      // inputRef.current?.removeEventListener("change", setOnChange);
    };
  }, [inputRef.current]);

  return isRequired;
}

type InputRef = React.ForwardedRef<unknown>;
type FuncRef = (node: unknown) => void;

const mergeRefs = (...refs: (InputRef | FuncRef)[]) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (element: unknown) => {
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
  return React.forwardRef<unknown, FormFieldFactoryProps<T>>(
    function ForwardWrapperRefs(props: FormFieldFactoryProps<T>, forwardedRef) {
      const inputRef = React.useRef<HTMLInputElement>(null);
      const [focused] = useFocus(inputRef);
      const isRequired = useRequired(inputRef, props.required);

      const { kind, label, ...componentProps } = props;

      return (
        <Field
          kind={kind}
          focused={focused}
          label={label}
          disabled={false}
          pending={componentProps.pending}
          required={isRequired}
        >
          <Component
            {...((componentProps as unknown) as T)}
            inputRef={mergeRefs(inputRef, forwardedRef)}
          />
        </Field>
      );
    }
  );
}

export type FormFieldStatusProps<T> = T & { pending?: boolean };

export function FormFieldStatus<T>(Component: React.FunctionComponent<T>) {
  return function WithStatus({ pending, ...props }: FormFieldStatusProps<T>) {
    // @ts-ignore
    return <Component {...props}>{pending && <Spinner size="s" />}</Component>;
  };
}
