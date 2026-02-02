import { palette } from "./src/styles/palette";
import type { Config } from "tailwindcss";
// Tailwind.config is not recommended in v4 but I used it because of mui theme system

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
        border: {
            default: palette.border.default,
        }
      },
    },
  },
};

export default config;