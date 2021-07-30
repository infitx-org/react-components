import { useEffect, useRef } from "react";

type PossibleTimeout = NodeJS.Timeout | undefined;

export function useTimeout(
  callback: () => void,
  delay: number
): PossibleTimeout {
  const savedCallback = useRef(callback);
  let timeout: PossibleTimeout;

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the timeout.
  useEffect(() => {
    timeout = setTimeout(() => savedCallback.current(), delay);

    return () => clearTimeout(timeout as NodeJS.Timeout);
  }, [delay]);

  return timeout;
}

export function useInterval(
  callback: () => void,
  delay: number
): PossibleTimeout {
  const savedCallback = useRef(callback);
  let interval: PossibleTimeout;

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    interval = setInterval(() => savedCallback.current(), delay);

    return () => clearInterval(interval as NodeJS.Timeout);
  }, [delay]);

  return interval;
}
