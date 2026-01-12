import { useRef, type ReactNode } from 'react';
import Navbar from './navbar';
import Footer from './footer/index';
import './styles.css';
import { useMainHeight } from '../hooks/useMainHeight';
import { BasicAlert } from '../components/BasicAlert/BasicAlert';

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
      {/* Todo: Search for placement of this component: */}
      <BasicAlert />
    </>
  );
};

export default MainLayout;
