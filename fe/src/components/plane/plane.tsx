import { usePlane } from '../../hooks/usePlane';
import { transformPlaneData } from '../../utils/transformer';
import CloseButton from '../ui/close-button';
import ErrorState from '../ui/error';
import LoadingState from '../ui/loading';

const cardClassName = 'w-64 rounded-lg border border-gray-700 bg-gray-900 text-white shadow-lg';

const Plane = ({ planeId, onClose }: { planeId: string; onClose: () => void }) => {
  const { data, error, status } = usePlane(planeId);

  if (error) {
    return <ErrorState onClose={onClose} />;
  }

  if (status === 'connecting') {
    return <LoadingState onClose={onClose} />;
  }

  const rows = transformPlaneData(data);

  return (
    <section className={cardClassName}>
      <header className="flex items-center justify-between gap-2 border-b border-gray-700 px-2 py-1.5">
        <div className="min-w-0">
          <p className="text-[9px] uppercase tracking-wide text-gray-400">Flight details</p>
          <h1 className="truncate text-[11px] font-semibold">
            {data ? `${data.airline} ${data.flightNumber}` : 'Loading flight…'}
          </h1>
        </div>

        <div className="flex items-center gap-1">
          {status === 'closed' && (
            <span className="rounded-full bg-red-500 px-1.5 py-0.5 text-[8px] font-semibold capitalize">
              Reconnecting...
            </span>
          )}
          {data && (
            <span className="rounded-full bg-green-500 px-1.5 py-0.5 text-[8px] font-semibold capitalize">
              {data.status}
            </span>
          )}
          <CloseButton onClose={onClose} />
        </div>
      </header>

      {data && (
        <div className="space-y-2 p-2 text-[10px]">
          <div className="grid grid-cols-2 gap-x-2 gap-y-1">
            {rows.map(({ label, value }) => (
              <div key={label} className="contents">
                <span className="text-gray-400">{label}</span>
                <span className={label === 'Route' || label === 'Aircraft' ? 'font-semibold' : ''}>
                  {value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Plane;
