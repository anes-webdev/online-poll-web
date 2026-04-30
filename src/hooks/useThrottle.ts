import { useEffect, useRef, useState } from 'react';

export const useThrottle = <T>(value: T, delay: number): T => {
  const lastExecution = useRef(0);
  const [throttledValue, setThrottledValue] = useState<T>(value);

  useEffect(() => {
    if (lastExecution.current === 0) {
      lastExecution.current = Date.now();
    }

    const remainingTime = delay - (Date.now() - lastExecution.current);

    const timeout = setTimeout(() => {
      setThrottledValue(value);
      lastExecution.current = Date.now();
    }, remainingTime);

    return () => clearTimeout(timeout);
  }, [delay, value]);

  return throttledValue as T;
};
