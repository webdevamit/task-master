export const SOCKET_BASE_URL = import.meta.env.VITE_SOCKET_BASE_URL || 'ws://localhost:4000';

export const SOCKET_PLANES_URL = `${SOCKET_BASE_URL}/ws/planes/basic`;
export const SOCKET_PLANE_URL = `${SOCKET_BASE_URL}/ws/planes/details`;
export const MAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';
