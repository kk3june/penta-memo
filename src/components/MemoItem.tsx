import { formatDate } from '@/utils/formatter';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box, Card, CardContent, IconButton, Typography } from '@mui/material';

interface MemoItemProps {
  memo: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
  };
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onClick?: (id: number) => void;
}

function MemoItem({ memo, onEdit, onDelete, onClick }: MemoItemProps) {
  return (
    <Card
      key={memo.id}
      sx={{
        mb: 2,
        '&:hover': { boxShadow: 3 },
        cursor: 'pointer',
      }}
      onClick={() => onClick?.(memo.id)}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant='h6' component='h3' noWrap>
              {memo.title}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                mt: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}>
              {memo.content}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', ml: 2 }}>
            <IconButton
              size='small'
              color='primary'
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(memo.id);
              }}>
              <EditIcon />
            </IconButton>

            <IconButton
              size='small'
              color='error'
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(memo.id);
              }}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            mt: 2,
          }}>
          <Typography variant='caption' color='text.secondary'>
            생성: {formatDate(memo.createdAt)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

export default MemoItem;
