import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const Routing = ({ origin, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !origin || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(origin.lat, origin.lng),
        L.latLng(destination.lat, destination.lng)
      ],
      routeWhileDragging: false,
      show: false, // Hide the itinerary panel
      addWaypoints: false, // Prevent users from adding new waypoints
      createMarker: () => null, // Disable default markers
      lineOptions: {
        styles: [{ color: '#6FA1EC', opacity: 1, weight: 5 }]
      }
    }).addTo(map);

    return () => {
      if (routingControl) {
        routingControl.setWaypoints([]);
        map.removeControl(routingControl);
      }
    };
  }, [map, origin, destination]);

  return null;
};

export default Routing;