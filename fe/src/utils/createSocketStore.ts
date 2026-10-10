import type { ConnectionStatus } from '../types/flight';

export interface SocketStore<T> {
  subscribe: (listener: () => void) => void;
  getSnapshot: () => SocketStoreSnapshot<T>;
}

export type Send = (message: unknown) => void;

export interface SocketStoreSnapshot<T> {
  data: T;
  error: string | null;
  status: ConnectionStatus;
}

export function createSocketStore<T>({
  url,
  initialData,
  onOpen,
  handleMessage,
  onClose,
}: {
  url: string;
  initialData: T;
  onOpen?: (send: Send) => void;
  handleMessage: (message: unknown) => Partial<SocketStoreSnapshot<T>> | null;
  onClose?: (send: Send) => void;
}) {
  let snapshot: SocketStoreSnapshot<T> = {
    status: 'connecting',
    data: initialData,
    error: null,
  };

  let socket: WebSocket | null = null;
  const listeners = new Set<() => void>();
  let attempt = 0;
  let reconnectTimeoutId: ReturnType<typeof setTimeout> | undefined;
  let idleTimeoutId: ReturnType<typeof setTimeout> | undefined;

  const update = (newSnapshot: Partial<SocketStoreSnapshot<T>>) => {
    snapshot = { ...snapshot, ...newSnapshot };
    listeners.forEach((listener) => listener());
  };

  const send: Send = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.error('WebSocket is not open. Unable to send message:', message);
    }
  };

  const connect = () => {
    reconnectTimeoutId = undefined;
    if (snapshot.status !== 'connecting') {
      update({ status: 'connecting' });
    }

    const ws = new WebSocket(url);
    socket = ws;
    ws.onopen = () => {
      attempt = 0;
      update({
        status: 'open',
        error: null,
      });
      if (onOpen) {
        onOpen(send);
      }
      console.log(`Connect to WebSocket at ${url}...`);
    };

    ws.onmessage = (event) => {
      let message: unknown;
      try {
        message = JSON.parse(event.data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', event.data, error);
        return;
      }
      const patch = handleMessage(message);
      console.log('WebSocket store updated:', message);
      if (patch) {
        update(patch);
      }
    };

    ws.onerror = () => {
      update({ status: 'error', error: 'WebSocket encountered an error', data: snapshot.data });
    };

    ws.onclose = () => {
      if (socket !== ws) {
        return;
      }
      socket = null;
      update({
        ...snapshot,
        status: 'closed',
      });

      scheduleReconnect();
    };
  };

  const scheduleReconnect = () => {
    const base = Math.min(1000 * 2 ** attempt, 30000); // Exponential backoff capped at 30 seconds
    attempt++;
    reconnectTimeoutId = setTimeout(connect, base / 2 + (Math.random() * base) / 2);
  };

  const disconnect = () => {
    if (!socket) return;
    const ws = socket;
    socket = null;
    onClose?.(send);
    ws.close();
  };

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    clearTimeout(idleTimeoutId);
    if (!socket && !reconnectTimeoutId) {
      connect();
    }

    return () => {
      listeners.delete(listener);
      if (listeners.size === 0) {
        idleTimeoutId = setTimeout(disconnect, 2000); // 2-second grace period
      }
    };
  };

  const getSnapshot = () => snapshot;

  return {
    subscribe,
    getSnapshot,
  };
}
