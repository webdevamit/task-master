import { useEffect, useRef, type RefObject } from 'react';
import { MAP_STYLE_URL } from '../constants/config';
import {
  MapLibreMap,
  NavigationControl,
  setWorkerUrl,
  type GeoJSONSource,
  type MapLayerMouseEvent,
} from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibreglWorkerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?url';
import type { PlaneBasic } from '../types/flight';

setWorkerUrl(maplibreglWorkerUrl);

export const useMapLibre = ({
  containerRef,
  data: planes,
  onSelectPlane,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  data: PlaneBasic[] | [];
  onSelectPlane: (planeId: string) => void;
}) => {
  const mapRef = useRef<MapLibreMap | null>(null);
  const isMapLoadedRef = useRef<boolean>(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const instance = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE_URL,
      center: [0, 20],
      zoom: 2,
    });

    instance.addControl(new NavigationControl(), 'top-right');
    instance.once('load', () => {
      instance.addSource('planes-source', {
        type: 'geojson',
        data: { type: 'FeatureCollection', features: [] },
      });
      instance.addLayer({
        id: 'planes-layer',
        type: 'symbol',
        source: 'planes-source',
        layout: {
          'icon-image': 'airport',
        },
      });
      instance.on('mouseenter', 'planes-layer', () => {
        instance.getCanvas().style.cursor = 'pointer';
      });
      instance.on('mouseleave', 'planes-layer', () => {
        instance.getCanvas().style.cursor = '';
      });
    });
    isMapLoadedRef.current = true;
    mapRef.current = instance;

    return () => {
      instance.remove();
      mapRef.current = null;
    };
  }, [containerRef]);

  useEffect(() => {
    const map = mapRef.current;
    // Ensure both the map exists and the 'load' event has fired completely
    if (!map || !isMapLoadedRef.current || !planes) return;

    const source = map.getSource('planes-source') as GeoJSONSource;
    if (source) {
      const features = planes.map((plane) => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [plane.longitude, plane.latitude, plane.altitude],
        },
        properties: {
          id: plane.id,
        },
      }));
      source.setData({ type: 'FeatureCollection', features });
    }
  }, [planes]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const handleClick = (event: MapLayerMouseEvent) => {
      const features = event.features?.[0];
      const id = features?.properties?.id as string | undefined;
      if (id) {
        onSelectPlane(id);
      }
    };
    map.on('click', 'planes-layer', handleClick);
    return () => {
      map.off('click', 'planes-layer', handleClick);
    };
  }, [onSelectPlane]);

  return mapRef;
};
