import Header from '@/components/common/Header';
import MemoForm from '@/components/MemoForm';
import MemoItem from '@/components/MemoItem';
import { memos } from '@/mock';
import { Box, Button, Container, List, Typography } from '@mui/material';
import { useState } from 'react';

function MemoApp() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  function handleToggleAddModal() {
    setIsOpenAddModal(!isOpenAddModal);
  }
  function handleCloseAddModal() {
    setIsOpenAddModal(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleEdit(id: number) {
    console.log(id, 'edit');
  }

  function handleDelete(id: number) {
    console.log(id, 'delete');
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container maxWidth='md' sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ mt: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h5'>메모 목록</Typography>
              <Button variant='contained' onClick={handleToggleAddModal}>
                메모 추가
              </Button>
            </Box>

            {isOpenAddModal && (
              <MemoForm
                isOpenAddModal={isOpenAddModal}
                onClose={handleCloseAddModal}
                onSubmit={handleSubmit}
              />
            )}

            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {memos.map((memo) => (
                <MemoItem
                  key={memo.id}
                  memo={memo}
                  onEdit={() => handleEdit(memo.id)}
                  onDelete={() => handleDelete(memo.id)}
                />
              ))}
            </List>
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
