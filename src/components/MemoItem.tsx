import { Memo } from '@/types';
import { formatDate } from '@/utils/formatter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Card,
  CardContent,
  Collapse,
  Divider,
  IconButton,
  Typography,
} from '@mui/material';
import { useState } from 'react';

interface MemoItemProps {
  memo: Memo;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function MemoItem({ memo, onEdit, onDelete }: MemoItemProps) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card key={memo.id} sx={{ mb: 2, '&:hover': { boxShadow: 3 } }}>
      <CardContent sx={{ pb: 1 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Box
            sx={{
              flex: 1,
              cursor: 'pointer',
            }}
            onClick={handleExpandClick}>
            <Typography variant='h6' component='h3' noWrap>
              {memo.title}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', ml: 2, alignItems: 'center' }}>
            <IconButton
              size='small'
              color='primary'
              onClick={() => {
                onEdit(memo.id);
              }}>
              <EditIcon />
            </IconButton>

            <IconButton
              size='small'
              color='error'
              onClick={() => {
                onDelete(memo.id);
              }}>
              <DeleteIcon />
            </IconButton>

            <IconButton
              size='small'
              onClick={handleExpandClick}
              sx={{
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s',
              }}>
              <ExpandMoreIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 1,
          }}>
          <Typography variant='caption' color='text.secondary'>
            생성: {formatDate(memo.createdAt)}
            {memo.updatedAt && ` / 수정: ${formatDate(memo.updatedAt)}`}
          </Typography>
        </Box>

        <Collapse in={expanded} timeout='auto' unmountOnExit>
          <Box sx={{ mt: 2 }}>
            <Divider sx={{ my: 1 }} />
            <Typography
              variant='body1'
              sx={{ mt: 2, mb: 2, whiteSpace: 'pre-wrap' }}>
              {memo.content}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
}

export default MemoItem;
