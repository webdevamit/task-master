import CloseButton from './close-button';
const cardClassName =
  'w-[280px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg bg-gray-800 text-white shadow-lg';

const ErrorState = ({ onClose }: { onClose: () => void }) => (
  <section className={cardClassName}>
    <header className="flex items-center justify-between gap-2 border-b border-gray-700 px-2 py-1.5">
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wide text-gray-400">Flight details</p>
        <h1 className="truncate text-[11px] font-semibold">Unable to load flight details</h1>
      </div>
      <CloseButton onClose={onClose} />
    </header>

    <div className="flex min-h-[80px] items-center justify-center px-3 py-4 text-center text-[10px] text-red-200">
      <div className="flex items-center gap-2">
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-red-300 border-t-transparent" />
        <span>Something went wrong while loading the flight.</span>
      </div>
    </div>
  </section>
);

export default ErrorState;
