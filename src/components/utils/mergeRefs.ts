import { ForwardedRef } from "react";

type InputRef<T> = ForwardedRef<T>;
type FuncRef<T> = (node: T) => void;

export default function mergeRefs<T>(...refs: (InputRef<T> | FuncRef<T>)[]) {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (element: T) => {
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
