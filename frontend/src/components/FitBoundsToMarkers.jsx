import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const FitBoundsToMarkers = ({ points }) => {
  const map = useMap();

  useEffect(() => {
    console.log('DEBUG: FitBoundsToMarkers useEffect triggered with points:', points);
    // Filter out any invalid or null points
    const validPoints = points.filter(p => p && typeof p.lat === 'number' && typeof p.lng === 'number');

    if (validPoints.length > 0) {
      const bounds = L.latLngBounds(validPoints.map(p => [p.lat, p.lng]));
      console.log('DEBUG: Calculated bounds:', bounds);
      map.flyToBounds(bounds, { padding: [50, 50], duration: 1.5, easeLinearity: 0.5 });
      console.log('DEBUG: map.flyToBounds called.');
    } else {
      console.log('DEBUG: No valid points to fit bounds.');
    }
  }, [points, map]);

  return null;
};

export default FitBoundsToMarkers;
