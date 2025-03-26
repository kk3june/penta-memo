import Header from '@/components/common/Header';
import Notification from '@/components/common/Notification';
import DeleteConfirmModal from '@/components/DeleteConfirmModal';
import MemoForm from '@/components/MemoForm';
import MemoItem from '@/components/MemoItem';
import { useMemoContext } from '@/context/MemoContext';
import { Memo, NewMemo } from '@/types';
import {
  AlertColor,
  Box,
  Button,
  Container,
  List,
  Typography,
} from '@mui/material';
import { useState } from 'react';

function MemoApp() {
  const { state, addMemo, updateMemo, deleteMemo } = useMemoContext();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<Memo | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [memoToDelete, setMemoToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success' as AlertColor,
  });

  const showNotification = (
    message: string,
    severity: AlertColor = 'success',
  ) => {
    setNotification({
      open: true,
      message,
      severity,
    });
  };

  const handleCloseNotification = () => {
    setNotification((prev) => ({
      ...prev,
      open: false,
    }));
  };

  function handleToggleAddModal() {
    setIsOpenAddModal(!isOpenAddModal);

    setIsEditMode(false);
    setSelectedMemo(null);
  }

  function handleCloseModal() {
    setIsOpenAddModal(false);
    setIsEditMode(false);
    setSelectedMemo(null);
  }

  function handleSubmitAdd(data: { title: string; content: string }) {
    const newMemo: NewMemo = {
      title: data.title,
      content: data.content,
    };

    addMemo(newMemo);
    handleCloseModal();
    showNotification('메모가 추가되었습니다.');
  }

  function handleSubmitEdit(data: { title: string; content: string }) {
    if (selectedMemo) {
      const updatedMemo: Memo = {
        ...selectedMemo,
        title: data.title,
        content: data.content,
      };

      updateMemo(updatedMemo);
      handleCloseModal();
      showNotification('메모가 수정되었습니다.');
    }
  }

  function handleEdit(id: string) {
    const memoToEdit = state.memos.find((memo) => memo.id === id);
    if (memoToEdit) {
      setSelectedMemo(memoToEdit);
      setIsEditMode(true);
      setIsOpenAddModal(true);
    }
  }

  function handleDeleteClick(id: string) {
    const memoToDelete = state.memos.find((memo) => memo.id === id);
    if (memoToDelete) {
      setMemoToDelete({
        id: memoToDelete.id,
        title: memoToDelete.title,
      });
      setDeleteConfirmOpen(true);
    }
  }

  function handleConfirmDelete() {
    if (memoToDelete) {
      deleteMemo(memoToDelete.id);
      setDeleteConfirmOpen(false);
      setMemoToDelete(null);
      showNotification('메모가 삭제되었습니다.');
    }
  }

  function handleCancelDelete() {
    setDeleteConfirmOpen(false);
    setMemoToDelete(null);
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
                onClose={handleCloseModal}
                onSubmit={isEditMode ? handleSubmitEdit : handleSubmitAdd}
                initialData={
                  isEditMode && selectedMemo
                    ? {
                        title: selectedMemo.title,
                        content: selectedMemo.content,
                      }
                    : undefined
                }
              />
            )}

            <List sx={{ width: '100%', bgcolor: 'background.paper', mt: 2 }}>
              {state.memos.length > 0 ? (
                state.memos.map((memo) => (
                  <MemoItem
                    key={memo.id}
                    memo={memo}
                    onEdit={handleEdit}
                    onDelete={handleDeleteClick}
                  />
                ))
              ) : (
                <Typography
                  variant='body1'
                  sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  메모가 없습니다. 새 메모를 추가해보세요.
                </Typography>
              )}
            </List>
          </Box>
        </Container>
      </Box>

      {/* 삭제 확인 모달 */}
      {memoToDelete && (
        <DeleteConfirmModal
          open={deleteConfirmOpen}
          memoTitle={memoToDelete.title}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* 알림 컴포넌트 */}
      <Notification
        open={notification.open}
        message={notification.message}
        severity={notification.severity}
        onClose={handleCloseNotification}
      />

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
