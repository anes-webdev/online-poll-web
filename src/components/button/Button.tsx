import type { ButtonProps } from "@mui/material/Button";
import MuiButton from "@mui/material/Button";
import { capitalizeFirst } from "../../utils/CapitalizeFirst";


const Button = ({ children, ...props }: ButtonProps) => {
  const content =
    typeof children === "string" ? capitalizeFirst(children) : children;

  return <MuiButton {...props}>{content}</MuiButton>;
}

export default Button;