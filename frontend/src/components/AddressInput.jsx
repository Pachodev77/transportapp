import React, { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const AddressInput = ({ label, onSelect, icon, value, onChange, onUseCurrentLocation }) => {
  const [internalQuery, setInternalQuery] = useState(value); // Internal state for typing
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const isTypingRef = useRef(false); // Track if user is actively typing

  // Sync external value with internal query
  useEffect(() => {
    if (!isTypingRef.current) { // Only update internalQuery if not actively typing
      setInternalQuery(value);
    }
  }, [value]);

  useEffect(() => {
    if (internalQuery.length < 3) {
      setResults([]);
      return;
    }

    const search = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${internalQuery}&format=json&addressdetails=1`
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
  }, [internalQuery]); // Depend on internalQuery

  const handleInputChange = (e) => {
    isTypingRef.current = true; // User is typing
    setInternalQuery(e.target.value);
    onChange(e.target.value); // Propagate change to parent
  };

  const handleSelect = (result) => {
    isTypingRef.current = false; // User selected, no longer typing
    setInternalQuery(result.display_name); // Update internal query
    setResults([]); // Clear results
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
            value={internalQuery} // Use internalQuery for input value
            onChange={handleInputChange} // Use new handler
            onBlur={() => isTypingRef.current = false} // Reset typing state on blur
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
        {results.length > 0 && isTypingRef.current && ( // Only show if results and typing
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