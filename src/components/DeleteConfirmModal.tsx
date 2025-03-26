import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface DeleteConfirmModalProps {
  open: boolean;
  memoTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

function DeleteConfirmModal({
  open,
  memoTitle,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>메모 삭제</DialogTitle>
      <DialogContent>
        <DialogContentText>
          "{memoTitle}" 메모를 삭제하시겠습니까?
          <br />
          삭제한 메모는 복구할 수 없습니다.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant='outlined'>
          취소
        </Button>
        <Button onClick={onConfirm} color='error' variant='contained' autoFocus>
          삭제
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmModal;
