import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const Routing = ({ origin, destination }) => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map) return;

    const control = L.Routing.control({
      waypoints: [], // Start with empty waypoints
      routeWhileDragging: false,
      show: false,
      addWaypoints: false,
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: '#6FA1EC', opacity: 1, weight: 5 }]
      },
      fitSelectedRoutes: false // Disable automatic map fitting to the route
    }).addTo(map);

    setRoutingControl(control);

    // Cleanup: remove the control when the component unmounts
    return () => {
      if (map && control) {
        map.removeControl(control);
      }
    };
  }, [map]); // Effect runs only once when the map is ready

  useEffect(() => {
    // This effect runs when origin or destination changes
    if (routingControl) {
      const handler = setTimeout(() => {
        if (origin && destination) {
          // Set waypoints if we have both
          routingControl.setWaypoints([
            L.latLng(origin.lat, origin.lng),
            L.latLng(destination.lat, destination.lng)
          ]);
        } else {
          // Otherwise, clear the waypoints
          routingControl.setWaypoints([]);
        }
      }, 500); // Debounce for 500ms

      return () => {
        clearTimeout(handler);
      };
    }
  }, [routingControl, origin, destination]);

  return null;
};

export default Routing;