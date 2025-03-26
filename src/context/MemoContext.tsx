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
};

type MemoAction =
  | { type: 'ADD_MEMO'; payload: Memo }
  | { type: 'UPDATE_MEMO'; payload: Memo }
  | { type: 'DELETE_MEMO'; payload: string };

interface MemoContextProps {
  state: MemoState;
  addMemo: (memo: NewMemo) => void;
  updateMemo: (memo: Memo) => void;
  deleteMemo: (id: string) => void;
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
  };

  const updateMemo = (memo: Memo) => {
    const updatedMemo: Memo = {
      ...memo,
      updatedAt: new Date().toISOString(),
    };
    dispatch({ type: 'UPDATE_MEMO', payload: updatedMemo });
  };

  const deleteMemo = (id: string) => {
    dispatch({ type: 'DELETE_MEMO', payload: id });
  };

  const contextValue: MemoContextProps = {
    state,
    addMemo,
    updateMemo,
    deleteMemo,
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
