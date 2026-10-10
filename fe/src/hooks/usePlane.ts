import { useMemo, useSyncExternalStore } from 'react';
import { createSocketStore } from '../utils/createSocketStore';
import { SOCKET_PLANE_URL } from '../constants/config';

const planeStore = (planeId: string) =>
  createSocketStore({
    url: SOCKET_PLANE_URL,
    initialData: null as unknown as T,
    onOpen: (send) => {
      // Optionally send a message to the server when the connection opens
      send({ type: 'subscribe', planeId });
    },
    onClose: (send) => {
      // Optionally send a message to the server when the connection closes
      send({ type: 'unsubscribe', planeId });
    },
    handleMessage: (message) => {
      // Handle incoming messages for the specific plane
      const msg = message as { type: string; data: T; error?: string };
      if ('type' in msg) {
        return msg.type === 'error' ? { data: null, error: msg.error } : null;
      }
      return { data: msg, error: null };
    },
  });

/** Store a plane value and expose helpers for updating or resetting it. */
export function usePlane(planeId: string) {
  const store = useMemo(() => planeStore(planeId), [planeId]);

  return useSyncExternalStore(store.subscribe, store.getSnapshot);
}

export default usePlane;
