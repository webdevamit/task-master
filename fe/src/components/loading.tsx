import CloseButton from './close-button';
const cardClassName =
  'w-[280px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-lg bg-gray-800 text-white shadow-lg';

const LoadingState = ({ onClose }: { onClose: () => void }) => (
  <section className={cardClassName}>
    <header className="flex items-center justify-between gap-2 px-2 py-1.5">
      <div>
        <p className="text-[9px] uppercase tracking-wide text-gray-400">Flight details</p>
        <p className="text-[11px]">Loading flight…</p>
      </div>
      <CloseButton onClose={onClose} />
    </header>
  </section>
);

export default LoadingState;
