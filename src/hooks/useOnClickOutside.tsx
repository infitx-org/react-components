import React from "react";

export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler?: (e: MouseEvent) => void
) {
  React.useEffect(() => {
    const listener = (event: MouseEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
        return;
      }
      handler?.(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
}
