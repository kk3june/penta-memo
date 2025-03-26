import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Props {
  isOpenAddModal: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; content: string }) => void;
  initialData?: { title: string; content: string };
}

function MemoForm({ isOpenAddModal, onClose, onSubmit, initialData }: Props) {
  const [memo, setMemo] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
  });
  const [isTouched, setIsTouched] = useState(false);

  useEffect(() => {
    if (initialData) {
      setMemo({ title: initialData.title, content: initialData.content });
    }
  }, [initialData]);

  useEffect(() => {
    if (!isOpenAddModal) {
      setMemo({ title: '', content: '' });
      setIsTouched(false);
    }
  }, [isOpenAddModal]);

  const handleSave = () => {
    setIsTouched(true);
    if (!memo.title.trim()) return;

    onSubmit({ title: memo.title.trim(), content: memo.content.trim() });
    setMemo({ title: '', content: '' });
    setIsTouched(false);
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSave();
  };

  return (
    <Dialog open={isOpenAddModal} onClose={onClose} fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>{initialData ? '메모 수정' : '메모 추가'}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label='제목'
            variant='outlined'
            margin='normal'
            required
            autoFocus
            value={memo.title}
            onChange={(e) => setMemo({ ...memo, title: e.target.value })}
            error={isTouched && !memo.title.trim()}
            helperText={
              isTouched && !memo.title.trim() ? '제목을 입력해주세요.' : ''
            }
          />
          <TextField
            fullWidth
            label='내용'
            margin='normal'
            variant='outlined'
            multiline
            rows={4}
            value={memo.content}
            onChange={(e) => setMemo({ ...memo, content: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant='outlined'
            sx={{ px: 4 }}
            onClick={onClose}
            type='button'>
            취소
          </Button>
          <Button
            variant='contained'
            sx={{ px: 4 }}
            onClick={handleSave}
            type='submit'>
            {initialData ? '수정' : '저장'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default MemoForm;
