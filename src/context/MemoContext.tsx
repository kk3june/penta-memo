import { Memo, MemoState, NewMemo } from '@/types';
import { loadState, saveState } from '@/utils/storage';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

const initialState: MemoState = {
  memos: [],
  notification: {
    open: false,
    message: '',
    severity: 'success',
  },
};

type MemoAction =
  | { type: 'ADD_MEMO'; payload: Memo }
  | { type: 'UPDATE_MEMO'; payload: Memo }
  | { type: 'DELETE_MEMO'; payload: string }
  | {
      type: 'SET_NOTIFICATION';
      payload: {
        message: string;
        severity: 'success' | 'info' | 'warning' | 'error';
      };
    }
  | { type: 'CLEAR_NOTIFICATION' };

interface MemoContextProps {
  state: MemoState;
  addMemo: (memo: NewMemo) => void;
  updateMemo: (memo: Memo) => void;
  deleteMemo: (id: string) => void;
  showNotification: (
    message: string,
    severity?: 'success' | 'info' | 'warning' | 'error',
  ) => void;
}

const MemoContext = createContext<MemoContextProps | undefined>(undefined);

const memoReducer = (state: MemoState, action: MemoAction): MemoState => {
  switch (action.type) {
    case 'ADD_MEMO':
      return {
        ...state,
        memos: [action.payload, ...state.memos],
      };
    case 'UPDATE_MEMO':
      return {
        ...state,
        memos: state.memos.map((memo) =>
          memo.id === action.payload.id ? action.payload : memo,
        ),
      };
    case 'DELETE_MEMO':
      return {
        ...state,
        memos: state.memos.filter((memo) => memo.id !== action.payload),
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity,
        },
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: {
          ...state.notification,
          open: false,
        },
      };
    default:
      return state;
  }
};

export const MemoProvider = ({ children }: { children: ReactNode }) => {
  const savedState = loadState();
  const [state, dispatch] = useReducer(memoReducer, savedState || initialState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addMemo = (memo: NewMemo) => {
    const newMemo: Memo = {
      ...memo,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'ADD_MEMO', payload: newMemo });
    showNotification('메모가 추가되었습니다.');
  };

  const updateMemo = (memo: Memo) => {
    const updatedMemo: Memo = {
      ...memo,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_MEMO', payload: updatedMemo });
    showNotification('메모가 수정되었습니다.');
  };

  const deleteMemo = (id: string) => {
    dispatch({ type: 'DELETE_MEMO', payload: id });
    showNotification('메모가 삭제되었습니다.');
  };

  const showNotification = (
    message: string,
    severity: 'success' | 'info' | 'warning' | 'error' = 'success',
  ) => {
    dispatch({ type: 'SET_NOTIFICATION', payload: { message, severity } });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3000);
  };

  const contextValue: MemoContextProps = {
    state,
    addMemo,
    updateMemo,
    deleteMemo,
    showNotification,
  };

  return (
    <MemoContext.Provider value={contextValue}>{children}</MemoContext.Provider>
  );
};

export const useMemoContext = (): MemoContextProps => {
  const context = useContext(MemoContext);
  if (context === undefined) {
    throw new Error('useMemoContext must be used within a MemoProvider');
  }
  return context;
};
