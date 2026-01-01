import { palette } from "./src/theme/palette";
import type { Config } from "tailwindcss";

//Todo: remove additional comments

const config: Config = {
  theme: {
    extend: {
      colors: {
        // bg: palette.background.default,
        // surface: palette.background.surface,
        primary: palette.primary.main,

        fg: {
          primary: palette.fg.primary,
          secondary: palette.fg.secondary,
          muted: palette.fg.muted,
        },
        border: {
            default: palette.border.default,
        }
        // success: palette.status.success,
        // warning: palette.status.warning,
        // error: palette.status.error,
        // info: palette.status.info,
      },
    },
  },
};

export default config;