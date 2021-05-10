import { ForwardedRef } from "react";

type InputRef = ForwardedRef<unknown>;
type FuncRef = (node: unknown) => void;

export default function mergeRefs(...refs: (InputRef | FuncRef)[]) {
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
}
