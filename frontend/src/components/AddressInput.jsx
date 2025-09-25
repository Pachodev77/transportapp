import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AddressInput = ({ label, onSelect, icon, value, onChange, onUseCurrentLocation }) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value.length < 3) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${value}&format=json&addressdetails=1`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching address:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(debounce);
  }, [value]);

  const handleSelect = (result) => {
    onChange(result.display_name);
    setResults([]);
    onSelect({
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
      address: result.display_name
    });
  };

  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-1">{label}</label>
      <div className="relative">
        <div className="flex items-center bg-light rounded-lg p-3">
          {icon}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent focus:outline-none ml-2"
            placeholder="Escribe una dirección..."
          />
          {onUseCurrentLocation && (
            <button
              type="button"
              className="px-3 flex items-center text-gray-500 hover:text-gray-700"
              onClick={onUseCurrentLocation}
            >
              <i className="fa-solid fa-crosshairs"></i>
            </button>
          )}
        </div>
        {results.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto">
            {results.map((result) => (
              <li
                key={result.place_id}
                onClick={() => handleSelect(result)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddressInput;