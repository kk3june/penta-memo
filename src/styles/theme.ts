import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
    htmlFontSize: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: [{ fontSize: '62.5%' }],
      },
    },
  },
});

export default theme;
