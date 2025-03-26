import { MemoProvider } from '@/context/MemoContext';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import MemoApp from './containers/MemoApp';
import globalStyles from './styles/globalStyles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <MemoProvider>
        <CssBaseline />
        {globalStyles}
        <MemoApp />
      </MemoProvider>
    </ThemeProvider>
  );
}

export default App;
