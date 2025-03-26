export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export type NewMemo = Pick<Memo, 'title' | 'content'>;

export interface NotificationState {
  open: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export interface MemoState {
  memos: Memo[];
  notification: NotificationState;
}

export interface MemoContextType {
  state: MemoState;
  addMemo: (memo: NewMemo) => void;
  updateMemo: (memo: Memo) => void;
  deleteMemo: (id: string) => void;
  showNotification: (
    message: string,
    severity?: 'success' | 'info' | 'warning' | 'error',
  ) => void;
}

export interface FormErrors {
  title: string;
  content: string;
}
