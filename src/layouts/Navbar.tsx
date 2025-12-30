import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import Logo from "../assets/Logo.svg";
import Button from "../components/button/Button";

// Todo: Move NavItems to another file:
// Change navitem(s) props naming

type NavItemProps = {
  text: string;
  link: string;
  isMobile: boolean;
  onClick?: () => void;
};

const NavItem = ({ link, isMobile, onClick, text }: NavItemProps) => {
  const classes = isMobile ? "m-7 sm:text-lg" : "ml-8";
  return (
    <Link onClick={onClick} to={link} className={classes}>
      <Button variant="navbar" color="primary">
        {text}
      </Button>
    </Link>
  );
};

type NavItemsProps = {
  isMobile: boolean;
  onItemClick?: () => void;
};

const NavItems = ({ isMobile, onItemClick }: NavItemsProps) => {
  // Todo: create an object for route addresses and use the best practice for writing them
  // Todo: Add translation for each text
  // Move this array into constants
  const navItemsData = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "Poll List",
      link: "/pollList",
    },
    {
      text: "create",
      link: "/createPoll",
    },
  ];

  return (
    <>
      {navItemsData.map(({ text, link }) => {
        return (
          <NavItem
            key={text}
            isMobile={isMobile}
            onClick={onItemClick}
            text={text}
            link={link}
          />
        );
      })}
    </>
  );
};

const Navbar = () => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  //   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isLoggedIn = true;
  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();

  const onSignInButtonClick = () => {
    if (navIsOpen) setNavIsOpen(false);
    if (isLoggedIn) {
      //   dispatch(authAction.logoutHandler());
      //   navigate("../");
    } else {
      //   navigate("../signIn");
    }
  };

  const onLinksClick = () => {
    setNavIsOpen(false);
  };

  return (
    <>
      <nav className="border-b border-gray-300 py-3 px-4 sm:py-3 sm:px-6 max-w-6xl mx-auto flex justify-between sticky top-0 bg-white z-10 items-center">
        <Link to="/">
          <img
            className="hover:opacity-75 transition-opacity h-8"
            alt="Logo"
            src={Logo}
          />
        </Link>
        <div className="mr-4 hidden md:block">
          {isLoggedIn && (
            <NavItems isMobile={false} />
            // <>
            //   <Link to="/" className="ml-14 text-gray-600 hover:text-black">
            //     Home
            //   </Link>
            //   <Link
            //     to="/pollList"
            //     className="ml-14 text-gray-600 hover:text-black"
            //   >
            //     Polls list
            //   </Link>
            //   <Link
            //     to="/createPoll"
            //     className="ml-14 text-gray-600 hover:text-black"
            //   >
            //     Create
            //   </Link>
            //   <NavItem text={"test"} isMobile={false} link="pollList" />
            // </>
          )}

          <button
            onClick={onSignInButtonClick}
            className="ml-14 text-gray-600 hover:text-black hover:border-gray-600 transition-all border border-gray-300 px-4 py-1.5 rounded-lg"
          >
            {isLoggedIn ? "Sign out" : "Sign in"}
          </button>
        </div>
        <div className="md:hidden">
          {!navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(true);
              }}
            >
              <MenuIcon className="text-gray-600" />
            </button>
          )}
          {navIsOpen && (
            <button
              onClick={() => {
                setNavIsOpen(false);
              }}
            >
              <CloseIcon className="text-gray-600" />
            </button>
          )}
        </div>
      </nav>
      {navIsOpen && (
        <div className="w-full h-92vh sticky z-20 bg-white top-14 left-0 md:hidden pt-16">
          <div className="flex flex-col items-center h-full z-20">
            {isLoggedIn && (
              <>
                <Link
                  onClick={onLinksClick}
                  to="/"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Home
                </Link>
                <Link
                  onClick={onLinksClick}
                  to="/pollList"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Polls list
                </Link>
                <Link
                  onClick={onLinksClick}
                  to="/createPoll"
                  className="m-7 text-gray-500 sm:text-lg"
                >
                  Create
                </Link>
              </>
            )}

            <button
              onClick={onSignInButtonClick}
              //   to="/"
              className="m-7 text-gray-500 sm:text-lg"
            >
              {isLoggedIn ? "Sign out" : "Sign in"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
