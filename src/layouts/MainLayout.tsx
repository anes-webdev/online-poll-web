import { useRef, type ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer/index';
import './styles.css';
import { useMainHeight } from '../hooks/useMainHeight';

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const navbarRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const mainHeight = useMainHeight(navbarRef, footerRef);

  return (
    <>
      <Navbar ref={navbarRef} />
      <main style={{ height: mainHeight }}>{children}</main>
      <Footer ref={footerRef} />
    </>
  );
};

export default MainLayout;
