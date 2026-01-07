import { useCallback, useEffect, useState } from 'react';

export const useMainHeight = (
  navbarRef: React.RefObject<HTMLElement | null>,
  footerRef: React.RefObject<HTMLElement | null>,
) => {
  const [mainHeight, setMainHeight] = useState<number>(0);

  const updateMainHeight = useCallback(() => {
    if (navbarRef.current && footerRef.current) {
      const navbarHeight = navbarRef.current?.clientHeight;
      const footerHeight = footerRef.current?.clientHeight;
      const mainHeight = window.innerHeight - navbarHeight - footerHeight;
      if (mainHeight) setMainHeight(mainHeight);
    }
  }, [footerRef, navbarRef, setMainHeight]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateMainHeight();
    window.addEventListener('resize', updateMainHeight);
    return () => {
      window.removeEventListener('resize', updateMainHeight);
    };
  }, [updateMainHeight]);

  return mainHeight;
};
