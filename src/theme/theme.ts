import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

const theme = createTheme({
  components: {
    MuiTypography: {
      variants: [
        {
          props: { color: 'textPrimary' },
          style: {
            color: palette.fg.primary,
          },
        },
        {
          props: { color: 'textSecondary' },
          style: {
            color: palette.fg.secondary,
          },
        },
        {
          props: { color: 'textMuted' },
          style: {
            color: palette.fg.muted,
          },
        },
      ],
    },
    MuiSvgIcon: {
      variants: [
        {
          props: { color: 'action' },
          style: {
            color: palette.fg.muted,
            ':hover': {
              color: palette.fg.secondary,
            },
          },
        },
      ],
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'navbar' },
          style: {
            fontSize: 16,
            fontWeight: 400,
            border: 'unset',
            color: palette.fg.secondary,
            backgroundColor: 'unset',
            '&:hover': {
              color: palette.fg.primary,
            },
          },
        },
        {
          props: { variant: 'outlined', color: 'neutral' },
          style: {
            fontSize: 16,
            fontWeight: 400,
            backgroundColor: 'unset',
            color: palette.fg.secondary,
            border: '1px solid',
            borderColor: palette.border.default,
            '&:hover': {
              border: '1px solid black',
              color: palette.fg.primary,
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 16,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
          },
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          '-webkit-transform': 'unset',
        },
      },
    },
  },
});

export default theme;
