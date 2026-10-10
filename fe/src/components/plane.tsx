import { usePlane } from '../hooks/usePlane';
import CloseButton from './close-button';
import ErrorState from './error';
import LoadingState from './loading';

const cardClassName = 'w-64 rounded-lg border border-gray-700 bg-gray-900 text-white shadow-lg';

const Plane = ({ planeId, onClose }: { planeId: string; onClose: () => void }) => {
  const { data, error, status } = usePlane(planeId);

  if (error) {
    return <ErrorState onClose={onClose} />;
  }

  if (status === 'connecting') {
    return <LoadingState onClose={onClose} />;
  }

  const rows = data
    ? [
        { label: 'Route', value: `${data.origin.city} → ${data.destination.city}` },
        { label: 'Origin', value: data.origin.airport },
        { label: 'Destination', value: data.destination.airport },
        { label: 'Aircraft', value: data.model },
        { label: 'Reg', value: data.registration },
        { label: 'Alt', value: `${data.altitude} m` },
        { label: 'Speed', value: `${data.speed} m/s` },
        { label: 'Heading', value: `${data.heading}°` },
        { label: 'V/S', value: `${data.verticalSpeed} m/s` },
        { label: 'Lat', value: String(data.latitude) },
        { label: 'Lng', value: String(data.longitude) },
        { label: 'Passengers', value: `${data.numberOfPassengers} / ${data.maxPassengers}` },
        { label: 'Duration', value: `${data.flightDuration} min` },
        { label: 'Arrival', value: new Date(data.estimatedArrival).toLocaleString() },
      ]
    : [];

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
          {data && (
            <span className="rounded-full bg-green-600 px-1.5 py-0.5 text-[8px] font-semibold capitalize">
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
              <>
                <span key={`${label}-label`} className="text-gray-400">
                  {label}
                </span>
                <span
                  key={`${label}-value`}
                  className={label === 'Route' || label === 'Aircraft' ? 'font-semibold' : ''}
                >
                  {value}
                </span>
              </>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Plane;
