import { palette } from "./src/theme/palette";
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: palette.primary.main,
        fg: {
          primary: palette.fg.primary,
          secondary: palette.fg.secondary,
          muted: palette.fg.muted,
        },
        // border: {
        //     default: palette.border.default,
        // }
      },
    },
  },
};

export default config;