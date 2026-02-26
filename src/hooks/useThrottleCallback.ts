import { useCallback, useEffect, useRef } from 'react';

export const useThrottleCallback = (
  callback: (...args: any[]) => void,
  delay: number,
) => {
  const lastExecution = useRef(0);
  const callbackRef = useRef(callback);
  const timeout = useRef<number>(null);

  useEffect(() => {
    if (lastExecution.current === 0) lastExecution.current = Date.now();
  }, []);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: any[]) => {
      const now = Date.now();
      const remainingTime = Math.max(delay - (now - lastExecution.current), 0);

      if (remainingTime < 0) {
        callbackRef.current(...args);
        lastExecution.current = Date.now();
      } else if (!timeout.current) {
        timeout.current = setTimeout(() => {
          callbackRef.current(...args);
          lastExecution.current = Date.now();
          timeout.current = null;
        }, remainingTime);
      }
    },
    [delay],
  );
};
