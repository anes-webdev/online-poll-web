import { Link } from "react-router";
import Button from "../../../components/button/Button";

type NavbarItemProps = {
  label: string;
  to: string;
  isMobileView: boolean;
  onClick?: () => void;
};

const NavbarItem = ({ to, isMobileView, onClick, label }: NavbarItemProps) => {
  const classes = isMobileView ? "my-6" : "ml-8";
  return (
    <Link onClick={onClick} to={to} className={classes}>
      <Button variant="navbar">
        {label}
      </Button>
    </Link>
  );
};

export default NavbarItem;