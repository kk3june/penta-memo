export interface Memo {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface MemoState {
  memos: Memo[];
}

export type NewMemo = Pick<Memo, 'title' | 'content'>;
