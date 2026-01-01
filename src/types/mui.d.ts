import "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navbar: true;
  }
    interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
