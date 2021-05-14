import React from "react";

export default function useInputFocus(
  inputRef: React.RefObject<HTMLInputElement>
): boolean {
  const [focused, setFocused] = React.useState(false);
  const setFocus = () => setFocused(true);
  const unsetFocus = (e) => {
    setFocused(false);
  };

  React.useEffect(() => {
    inputRef.current?.addEventListener("focus", setFocus);
    inputRef.current?.addEventListener("blur", unsetFocus);
    return () => {
      inputRef.current?.removeEventListener("focus", setFocus);
      inputRef.current?.removeEventListener("blur", unsetFocus);
    };
  }, [inputRef.current]);
  return focused;
}
