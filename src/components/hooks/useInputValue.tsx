import React from "react";

export default function useInputValue(
  inputRef: React.RefObject<HTMLInputElement>
): string | undefined {
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
  return value;
}
