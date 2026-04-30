import { useEffect } from 'react';

type SuspenseLoadingProps = {
  setLoading: (value: boolean) => void;
};

export const SuspenseLoading = ({ setLoading }: SuspenseLoadingProps) => {
  useEffect(() => {
    setLoading(true);
    return () => setLoading(false);
  }, [setLoading]);

  return null;
};
