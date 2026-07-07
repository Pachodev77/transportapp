import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

const Routing = ({ origin, destination }) => {
  const map = useMap();
  const [polyline, setPolyline] = useState(null);

  useEffect(() => {
    if (!map || !origin || !destination) return;

    let currentPolyline = null;
    let isMounted = true;

    const fetchRoute = async () => {
      try {
        // Fetch route with alternatives=true to get multiple options
        const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson&alternatives=true`;
        
        const response = await fetch(url);
        const data = await response.json();

        if (data.code === 'Ok' && data.routes && data.routes.length > 0) {
          // Find the route with the shortest physical distance
          const shortestRoute = data.routes.reduce((shortest, current) => {
            return current.distance < shortest.distance ? current : shortest;
          }, data.routes[0]);

          if (isMounted) {
            // Convert GeoJSON coordinates [lng, lat] to Leaflet coordinates [lat, lng]
            const latLngs = shortestRoute.geometry.coordinates.map(coord => [coord[1], coord[0]]);
            
            // Create and add the polyline
            currentPolyline = L.polyline(latLngs, {
              color: '#6FA1EC',
              weight: 5,
              opacity: 1
            }).addTo(map);
            
            setPolyline(currentPolyline);
          }
        }
      } catch (error) {
        console.error('Error fetching route:', error);
      }
    };

    // Debounce the fetch slightly
    const handler = setTimeout(() => {
      fetchRoute();
    }, 500);

    return () => {
      isMounted = false;
      clearTimeout(handler);
      if (currentPolyline && map) {
        map.removeLayer(currentPolyline);
      }
    };
  }, [map, origin, destination]);

  return null;
};

export default Routing;