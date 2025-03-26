import { MemoState } from '@/types';

const STORAGE_KEY = 'memoAppState';

export const loadState = (): MemoState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error(
      '로컬 스토리지에서 상태를 불러오는 중 오류가 발생했습니다:',
      err,
    );
    return undefined;
  }
};

export const saveState = (state: MemoState): void => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error(
      '상태를 로컬 스토리지에 저장하는 중 오류가 발생했습니다:',
      err,
    );
  }
};
