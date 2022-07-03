import { createTheme } from '@mui/material/styles';

export const backgroundColor = '#FFF';
export const baseColor = '#55acee';
export const secondaryColor = '#e1e8ed';

const { palette } = createTheme({
  palette: {
    primary: {
      main: baseColor,
    },
    background: {
      default: backgroundColor,
    },
    text: {
      fontFamily: 'Roboto',
    },
  },
}).palette;

const theme = createTheme({
  palette,
  typography: {
    fontFamily: [
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Cantarell',
      'Ubuntu',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {},
        notchedOutline: {
          borderColor: 'transparent !important',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: baseColor,
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '24px',
          borderRadius: '20rem',
          '&:hover': {
            backgroundColor: '#559fee',
          },
          '&.Mui-disabled': {
            pointerEvents: 'auto',
          },
        },
        containedSecondary: {
          backgroundColor: '#AAB8C2',
          '&:hover': {
            backgroundColor: '#657786',
          },
        },
      },
    },
  },
});

export default theme;
