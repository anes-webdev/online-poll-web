import NavbarItem from "./NavbarItem";

type NavbarListProps = {
  isMobileView: boolean;
  onItemClick?: () => void;
};

const NavbarList = ({ isMobileView, onItemClick }: NavbarListProps) => {
  // Todo: create an object for route addresses and use the best practice for writing them
  // Todo: Add translation for each text
  // Move this array into constants
  const navItemsData = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Poll List",
      path: "/pollList",
    },
    {
      label: "create",
      path: "/createPoll",
    },
  ];

  return (
    <>
      {navItemsData.map(({ label, path }) => {
        return (
          <NavbarItem
            key={label}
            label={label}
            to={path}
            isMobileView={isMobileView}
            onClick={onItemClick}
          />
        );
      })}
    </>
  );
};

export default NavbarList;
