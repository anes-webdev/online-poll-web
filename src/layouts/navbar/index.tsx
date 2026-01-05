import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router";
import Logo from "../../assets/Logo.svg";
import NavbarList from "./components/NavbarList";
import "./styles.css";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Button from "../../components/button/Button";
import { IconButton, Typography } from "@mui/material";
import { APP_ROUTES } from "../../constants/routes";

const Navbar = () => {
  const theme = useTheme();
  const isDesktopView = useMediaQuery(theme.breakpoints.up(760));
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const toggleMobileNav = () => setIsMobileNavOpen((prevState) => !prevState);
  const showMobileNav = !isDesktopView && isMobileNavOpen;
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = true;
  const signInBtnText = isLoggedIn ? "Sign out" : "Sign in";
  //   const dispatch = useDispatch();
    const navigate = useNavigate();

  const onSignInButtonClick = () => {
    if (isMobileNavOpen) setIsMobileNavOpen(false);
    if (isLoggedIn) {
      //   dispatch(authAction.logoutHandler());
        navigate(APP_ROUTES.LANDING);
    } else {
        navigate(APP_ROUTES.SIGN_IN);
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/">
          <img
            className="logo"
            alt="Logo"
            src={Logo}
          />
        </Link>
        {isDesktopView && (
          <div className="mr-4">
            {isLoggedIn && <NavbarList isMobileView={false} />}
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
              <CloseIcon color="action"/>
            ) : (
              <MenuIcon color="action"/>
            )}
          </IconButton>
        )}
      </nav>
      {showMobileNav && (
        <nav className="mobile-nav-menu-wrapper">
          {isLoggedIn && (
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
      <Typography color="textSecondary">primary color</Typography>
    </>
  );
};

export default Navbar;
