import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const FitBoundsToMarkers = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    // Filter out any invalid or null points
    const validPoints = points.filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number');

    if (validPoints.length > 0) {
      const bounds = L.latLngBounds(validPoints.map(p => [p.lat, p.lng]));
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, easeLinearity: 0.5 });
    }
  }, [points, map]);

  return null;
};

export default FitBoundsToMarkers;
