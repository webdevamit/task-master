import type { PlaneDetailed } from '../types/flight';

type PlaneRow = { label: string; value: string };

export const transformPlaneData = (data: PlaneDetailed | null | undefined): PlaneRow[] => {
  if (!data) {
    return [];
  }

  return [
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
  ];
};
