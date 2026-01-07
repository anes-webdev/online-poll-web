import "@mui/material/Button";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    navbar: true;
  }
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

import "@mui/material/Typography";

declare module "@mui/material/Typography" {
  interface TypographyPropsColorOverrides {
    muted: true;
  }
}
