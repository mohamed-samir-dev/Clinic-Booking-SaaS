'use client';

import { Provider } from 'react-redux';
import { store } from './store';
import { ReactNode, useEffect } from 'react';
import { loadUserFromStorage } from './slices/authSlice';

export function ReduxProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(loadUserFromStorage());
  }, []);

  return <Provider store={store}>{children}</Provider>;
}
