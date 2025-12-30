import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "navbar" },
          style: {
            fontSize: 16,
            fontWeight: 400,
            border: "unset",
            color: "#4B5563",
            backgroundColor: "unset",
            "&:hover": {
              backgroundColor: "unset",
              color: "black",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});

export default theme;
