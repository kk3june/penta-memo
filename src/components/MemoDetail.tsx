import { Memo } from '@/types';
import { formatDate } from '@/utils/formatter';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';

interface Props {
  memo: Memo | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
}

function MemoDetail({ memo, open, onClose, onEdit }: Props) {
  if (!memo) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>
        <Typography variant='h5' component='div'>
          {memo.title}
        </Typography>
        <Box sx={{ display: 'flex', mt: 1 }}>
          <Typography variant='caption' color='text.secondary'>
            생성: {formatDate(memo.createdAt)}
          </Typography>
          {memo.updatedAt && (
            <Typography variant='caption' color='text.secondary' sx={{ ml: 2 }}>
              수정: {formatDate(memo.updatedAt)}
            </Typography>
          )}
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <Typography
          variant='body1'
          sx={{ whiteSpace: 'pre-wrap', minHeight: '200px' }}>
          {memo.content}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onEdit} color='primary'>
          수정
        </Button>
        <Button onClick={onClose} color='primary'>
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default MemoDetail;
