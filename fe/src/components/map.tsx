import { useRef } from 'react';
import usePlanes from '../hooks/usePlanes';
import { useMapLibre } from '../hooks/useMapLibre';

export default function MapView({ onSelectPlane }: { onSelectPlane: (planeId: string) => void }) {
  const { data } = usePlanes();
  const containerRef = useRef<HTMLDivElement | null>(null);
  useMapLibre({ containerRef, data, onSelectPlane });
  return <div ref={containerRef} className="w-full h-full"></div>;
}
