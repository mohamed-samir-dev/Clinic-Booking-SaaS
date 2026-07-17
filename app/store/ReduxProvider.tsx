'use client';

import { Provider } from 'react-redux';
import { makeStore } from './store';
import { ReactNode, useRef } from 'react';

type AppStore = ReturnType<typeof makeStore>;

export function ReduxProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
