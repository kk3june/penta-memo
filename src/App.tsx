import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MemoApp from './containers/MemoApp';
import globalStyles from './styles/globalStyles';

const theme = createTheme({
  typography: {
    fontFamily: '"Noto Sans KR", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {globalStyles}
      <MemoApp />
    </ThemeProvider>
  );
}

export default App;
