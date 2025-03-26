import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MemoApp from './containers/MemoApp';
import globalStyles from './styles/globalStyles';
import theme from './styles/theme';

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
