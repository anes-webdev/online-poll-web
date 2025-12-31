import { styled } from "@mui/material/styles";
import Button from "../../../components/button/Button";

export const NavbarOutlinedButton = styled(Button)({
  border: "1px solid #D1D5DB",
  "&:hover": {
    border: "1px solid black",
  },
});