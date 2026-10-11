export const LABELS = {
  open: (count: string) => `Live ${count} planes`,
  connecting: () => 'Connecting...',
  error: () => 'Connection failed',
  closed: () => 'Disconnecting, retrying...',
};

export const background = {
  error: 'bg-red-500',
  closed: 'bg-orange-500',
  connecting: 'bg-orange-500',
  open: 'bg-green-500',
};
