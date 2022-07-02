import { createTheme } from '@mui/material/styles';

export const backgroundColor = '#FFF';

const { palette } = createTheme({
  palette: {
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
});

export default theme;
//
// body {
//     margin: 0;
//     font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
//         'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
//     sans-serif;
//     -webkit-font-smoothing: antialiased;
//     -moz-osx-font-smoothing: grayscale;
// }
//
// code {
//     font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
//         monospace;
// }
