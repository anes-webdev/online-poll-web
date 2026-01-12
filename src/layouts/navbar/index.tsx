import { useState, type Ref } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router';
import Logo from '../../assets/Logo.svg';
import NavbarList from './components/NavbarList';
import './styles.css';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Button from '../../components/button/Button';
import { IconButton } from '@mui/material';
import { APP_ROUTES } from '../../constants/routes';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { authAction } from '../../store/slices/auth';
import { useAuth } from '../../hooks/useAuth';

type NavbarProps = {
  ref: Ref<HTMLElement>;
};

const Navbar = ({ ref }: NavbarProps) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const isDesktopView = useMediaQuery(theme.breakpoints.up(760));

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen((prevState) => !prevState);
  const showMobileNav = !isDesktopView && isMobileNavOpen;

  const signInBtnText = isAuthenticated ? 'Sign out' : 'Sign in';

  const onSignInButtonClick = () => {
    if (isMobileNavOpen) setIsMobileNavOpen(false);
    if (isAuthenticated) {
      dispatch(authAction.logout());
      navigate(APP_ROUTES.LANDING);
    } else {
      navigate(APP_ROUTES.SIGN_IN);
    }
  };

  return (
    <>
      <nav ref={ref} className="navbar">
        <Link to="/">
          <img className="logo" alt="Logo" src={Logo} />
        </Link>
        {isDesktopView && (
          <div className="mr-4">
            {isAuthenticated && <NavbarList isMobileView={false} />}
            <Button
              className="ml-18!"
              onClick={onSignInButtonClick}
              variant="outlined"
              color="neutral"
            >
              {signInBtnText}
            </Button>
          </div>
        )}
        {!isDesktopView && (
          <IconButton className="p-0!" onClick={toggleMobileNav}>
            {isMobileNavOpen ? (
              <CloseIcon color="action" />
            ) : (
              <MenuIcon color="action" />
            )}
          </IconButton>
        )}
      </nav>
      {showMobileNav && (
        <nav className="mobile-nav-menu-wrapper">
          {isAuthenticated && (
            <NavbarList isMobileView={true} onItemClick={toggleMobileNav} />
          )}
          <Button
            variant="navbar"
            onClick={onSignInButtonClick}
            className="mt-6! text-gray-500"
          >
            {signInBtnText}
          </Button>
        </nav>
      )}
    </>
  );
};

export default Navbar;
