import { NAVBAR_ROUTES } from "../../../constants/navbarRoutes";
import NavbarItem from "./NavbarItem";

type NavbarListProps = {
  isMobileView: boolean;
  onItemClick?: () => void;
};

const NavbarList = ({ isMobileView, onItemClick }: NavbarListProps) => {
  return (
    <>
      {NAVBAR_ROUTES.map(({ label, path }) => {
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
