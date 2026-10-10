import { useSyncExternalStore } from 'react';
import type { BasicPlanesMessage, PlaneDetailed } from '../types/flight';
import { createSocketStore } from '../utils/createSocketStore';
import { SOCKET_PLANES_URL } from '../constants/config';

const planesStore = createSocketStore<PlaneDetailed[]>({
  url: SOCKET_PLANES_URL,
  initialData: [],
  handleMessage: (message) => {
    const msg = message as BasicPlanesMessage;
    // Handle incoming messages for the planes socket
    if (msg.type === 'planes') {
      return { data: msg.data };
    }
    return null;
  },
});

const usePlanes = () => {
  return useSyncExternalStore(planesStore.subscribe, planesStore.getSnapshot);
};

export default usePlanes;
