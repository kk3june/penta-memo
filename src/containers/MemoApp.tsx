import Header from '@/components/Header';
import { Box, Container, Typography } from '@mui/material';

function MemoApp() {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
          <Typography variant='h5'>메모 작성</Typography>

          <Box sx={{ mt: 4 }}>
            <Typography variant='h5'>메모 목록</Typography>
          </Box>
        </Container>
      </Box>

      <Box
        component='footer'
        sx={{ py: 3, bgcolor: 'primary.main', color: 'white' }}>
        <Container maxWidth='md'>
          <Typography variant='body2' align='center'>
            © {new Date().getFullYear()} Penta Security Memo App
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default MemoApp;
