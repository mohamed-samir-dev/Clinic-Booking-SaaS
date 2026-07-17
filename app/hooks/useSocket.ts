'use client';

import { useEffect, useRef, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppSelector } from '@/app/store/hooks';

type SocketEvent = {
  event: string;
  handler: (data: unknown) => void;
};

let globalSocket: Socket | null = null;

export function useSocket(events: SocketEvent[] = []) {
  const token = useAppSelector((state) => state.auth.token);
  const eventsRef = useRef(events);
  eventsRef.current = events;

  const connect = useCallback(() => {
    if (!token || globalSocket?.connected) return;

    globalSocket = io(process.env.NEXT_PUBLIC_API_URL || '', {
      auth: { token },
      transports: ['websocket'],
      reconnectionAttempts: 5,
      reconnectionDelay: 2000,
    });

    globalSocket.on('connect_error', (err) => {
      console.warn('Socket connection error:', err.message);
    });
  }, [token]);

  useEffect(() => {
    if (!token) return;
    connect();

    const socket = globalSocket;
    if (!socket) return;

    eventsRef.current.forEach(({ event, handler }) => {
      socket.on(event, handler);
    });

    return () => {
      eventsRef.current.forEach(({ event, handler }) => {
        socket?.off(event, handler);
      });
    };
  }, [token, connect]);

  const emit = useCallback((event: string, data?: unknown) => {
    globalSocket?.emit(event, data);
  }, []);

  return { emit, connected: globalSocket?.connected ?? false };
}

export function disconnectSocket() {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
  }
}
